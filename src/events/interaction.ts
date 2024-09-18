import { SlashCommandBuilder, Client, Interaction } from "discord.js";
import SlashCommandsData from "../util/SlashCommandsData";

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
        } catch (error) {
            const err = error as Error;
            console.error(`[!] Error: ${err.message}\n${err.stack}`);
        }
    }
}
