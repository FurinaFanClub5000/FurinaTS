import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import { TCGMatch } from '../buttons/TCGMatch';
import { setTimeout } from 'timers/promises';


function generateUid() {
    return `${new Date().getTime().toString(16)}-${Math.random().toString(16).substr(2)}`
}

export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const user = interaction.user
    const target = interaction.options.getUser("user")

    if (user.id == target!.id) { 
        let msg = await interaction.followUp({content: `Lol ${user.displayName} r u schizo`});
        await setTimeout(5000);
        msg.delete()
        return
    }

    const matchId = generateUid()

    const match = new TCGMatch(matchId, user.id, target!.id)
    match.init()

    const buttons = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder().setCustomId(`${matchId}_accept`).setLabel("Yes!").setStyle(ButtonStyle.Success), // gren
        new ButtonBuilder().setCustomId(`${matchId}_decline`).setLabel("No...").setStyle(ButtonStyle.Danger) // re d
    )
    interaction.followUp({content: `<@${target?.id}> ! ${user.displayName} has challenged you to a battle of TCG! Do you accept?`, components: [buttons]})

    

}
