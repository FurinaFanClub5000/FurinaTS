import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import CommandsData from '../util/CommandsData';


export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const user = interaction.user
    const target = interaction.options.getUser("user")

    const buttons = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder().setCustomId("accept").setLabel("Yes!").setStyle(ButtonStyle.Success), // gren
        new ButtonBuilder().setCustomId("decline").setLabel("No...").setStyle(ButtonStyle.Danger) // re d
    )
    interaction.followUp({content: `<@${target?.id}> ! ${user.displayName} has challenged you to a battle of TCG! Do you accept?`, components: [buttons]})
}
