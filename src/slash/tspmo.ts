import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import ClientData from '../util/ClientData';

export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    ClientData.tspmo(interaction.options.getBoolean("tspmo", true))
    await interaction.reply("ts pmo")

}
