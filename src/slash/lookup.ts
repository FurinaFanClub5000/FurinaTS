import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import { MaterialData, TextMapData } from '../util/GenshinResources';

export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const id = interaction.options.getInteger("id")
    const lang = interaction.options.getString("language")
    const TextMap = new TextMapData(lang!)

    const item = MaterialData.getMaterial(id!)
    if (item === false) {
        return interaction.followUp("invalid id")
    }

    const name = await TextMap.getText(item.nameTextMapHash)
    const desc = await TextMap.getText(item.descTextMapHash)
    const type = await TextMap.getText(item.typeDescTextMapHash)
    const icon = MaterialData.getIcon(item.icon)

    const star = "✦".repeat(item.rankLevel)

    const info = new EmbedBuilder()
    .setTitle(`${name} - ${star}`)
    .setDescription(desc)
    .setThumbnail(icon)
    .setFooter({text: `${type} || ID: ${id}`})

    return interaction.followUp({embeds: [info]})
    
}
