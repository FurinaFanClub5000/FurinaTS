import { Client, Message } from 'discord.js';
import CommandsData from '../util/CommandsData';
import ResponseData from '../util/ResponseData';

export default async function execute(client: Client, message: Message) {

    if (message.author.bot) return;

    if (message.content.startsWith("-")) {
        console.log(`[*] ${message.author.displayName}: ${message.content}`);
        const args = message.content.split(" ");
        const cmdName = args[0].replace("-", "");
        const cmd = CommandsData.getCommandData(cmdName);

        if (!cmd) {
            await message.reply("Command not found!");
            return;
        }

        try {
            const commandHandler = await import(cmd.module);
            await commandHandler.default(client, message);
            return
        } catch (error) {
            console.log(`[!] ${error}`)
            await message.reply("Something went wrong...");
            return;
        }
    } else {
        const response = ResponseData.getResponse(message.content);
        if (response) {
            const { type, response: res } = response;
            switch (type) {
                case "RESPONSE_REPLY":
                    await message.reply(res)
                    return
                case "RESPONSE_REACT":
                    await message.react(res)
                    return
            }
        }
    }
}
