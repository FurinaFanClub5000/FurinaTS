import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import CommandsData from '../util/CommandsData';


export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const helpEmbed = new EmbedBuilder()
    .setTitle("Furina's Commands")
    .setColor("#4287f5")
    .setThumbnail(interaction.user.displayAvatarURL());

    const commands = CommandsData.getCommands()
    for (const i in commands) {
        helpEmbed.addFields({name: commands[i].name, value: `${commands[i].description}\nAlias: ${commands[i].triggers.join(", ")}`})
    }

    await interaction.reply({embeds: [helpEmbed]})

}
