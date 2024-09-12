import {Client} from "discord.js"


export default async function execute(client: Client) {
    console.clear()
    console.log(`[+] Started as ${client.user?.displayName}!`);
}
