import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import { MaterialData, TextMapData } from '../util/GenshinResources';

export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const id = interaction.options.getInteger("id")

    const item = MaterialData.getMaterial(id!)
    if (item === false) {
        return interaction.followUp("invalid id")
    }

    const name = TextMapData.getText(item.nameTextMapHash)
    const desc = TextMapData.getText(item.descTextMapHash)
    const type = TextMapData.getText(item.typeDescTextMapHash)
    const icon = MaterialData.getIcon(item.icon)

    const star = "⭐".repeat(item.rankLevel)

    const info = new EmbedBuilder()
    .setTitle(`${name} - ${star}`)
    .setDescription(desc)
    .setThumbnail(icon)
    .setFooter({text: type})

    return interaction.followUp({embeds: [info]})
    
}
