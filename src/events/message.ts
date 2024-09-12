import { Client, Message } from 'discord.js';
import CommandsData from '../util/CommandsData';

export default async function execute(client: Client, message: Message) {

    if (message.author.bot) {
        return
    }

    if (message.content && message.content.startsWith("-")) {
        console.log(`[*] ${message.author.displayName}: ${message.content}`)
        const args = message.content.split(" ")
        const cmdName = args[0].replace("-", "") // help
        const cmd = CommandsData.getCommandData(cmdName)
        if (cmd == false) {
            await message.reply("Command not found!")
            return
        }
        try {
            const commandHandler = await import(cmd.module)
            await commandHandler.default(client, message)
        } catch {
            await message.reply("Something went wrong...")
            return
        }
    }

}
