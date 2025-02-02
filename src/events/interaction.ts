import { SlashCommandBuilder, Client, Interaction } from "discord.js";
import SlashCommandsData from "../util/SlashCommandsData";
import { TCGMatchData } from "../buttons/TCGMatch";

export default async function execute(client: Client, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        console.log(`[*] Recieved /${interaction.commandName}`)
        const command = SlashCommandsData.getSlashCommand(interaction.commandName);
        if (command === false) return interaction.reply("Something went wrong... The command data shouldn't be false");
        
        const module = await import(command.module);
        
        try {
            console.log(`[*] Attempting to execute /${interaction.commandName}`)
            await module.default(client, interaction);
            console.log(`[*] Finished executing /${interaction.commandName}`)
        } catch (error) {
            interaction.followUp("Something went wrong")
            const err = error as Error;
            console.error(`[!] Error: ${err.message}\n${err.stack}`);
        }
    } else if (interaction.isButton()) {
        if (interaction.customId.split("_").length === 2) { // temp solution until i get better lol but tcg!!!!!
            const s = interaction.customId.split("_")
            const matchId = s[0]
            const status = s[1] // accept or decline
            const matchData = TCGMatchData.getMatchFromId(matchId)
            if (matchData === undefined) {
                interaction.reply("huh")
            }
            matchData!.AOD(status, interaction)
        } else if (interaction.customId === "Lineup") {
            const userId = interaction.user.id
            const match = TCGMatchData.getMatchFromUserId(userId)
            if (!match) {
                return interaction.reply({content: "Not your match!", ephemeral: true})
            }
            match.showLineupModal(interaction)
        } else if (interaction.customId === "Ready") {
            const userId = interaction.user.id
            const match = TCGMatchData.getMatchFromUserId(userId)
            if (!match) {
                return interaction.reply({content: "Not your match!", ephemeral: true})
            }
            match.ready(interaction)
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId.split("_")[0] == "LineupModal") {
            const matchId = interaction.customId.split("_")[1]
            const match = TCGMatchData.getMatchFromId(matchId)
            if (!match) {return}
            if (interaction.user.id !== match.challengerId && interaction.user.id !== match.playerId) { return }
            match.setLineup(interaction)
        }
    } else {
        console.log("[?] Unknown interaction")
        console.log(interaction)
    }
}
