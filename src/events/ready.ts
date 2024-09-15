import {ActivityType, Client, PresenceUpdateStatus} from "discord.js"


export default async function execute(client: Client) {
    client.user?.setActivity("LIVE COURT REACTION!!", {type: ActivityType.Watching})
    client.user?.setStatus(PresenceUpdateStatus.DoNotDisturb)
    console.clear()
    console.log(`[+] Started as ${client.user?.displayName}!`);
}
