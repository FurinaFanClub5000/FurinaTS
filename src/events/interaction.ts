import { SlashCommandBuilder, Client, Interaction } from "discord.js";
import SlashCommandsData from "../util/SlashCommandsData";

export default async function execute(client: Client, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        const command = SlashCommandsData.getSlashCommand(interaction.commandName)
        if (command === false) return interaction.reply("Something went wrong... The command data shouldnt be false")
        const module = await import(command.module)
        try {
            await module.default(client, interaction)
            return
        } catch (error) {
            console.log(`[!] ${error}`)
            await interaction.reply("Something went wrong...");
            return;
        }
    }
}