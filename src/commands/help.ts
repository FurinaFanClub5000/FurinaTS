import { Client, EmbedBuilder, Message } from 'discord.js';
import CommandsData from '../util/CommandsData';

export default async function execute(client: Client, message: Message) {

    const helpEmbed = new EmbedBuilder()
    .setTitle("Furina's Commands")
    .setColor("#4287f5")
    .setThumbnail(message.author.displayAvatarURL());

    const commands = CommandsData.getCommands()
    for (const i in commands) {
        helpEmbed.addFields({name: commands[i].name, value: `${commands[i].description}\nAlias: ${commands[i].triggers.join(", ")}`})
    }

    await message.reply({embeds: [helpEmbed]})

}
