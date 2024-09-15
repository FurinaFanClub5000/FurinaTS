import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';
import SlashCommandsData from './SlashCommandsData';
import ClientData from './ClientData';


export default class RegisterUtil {
    public static async registerCommands() {
        const slashCommands = SlashCommandsData.getSlashCommands();

        const commands = slashCommands.map(command => {
            return SlashCommandsData.makeSlashCommand(command).toJSON()
        });

        const rest = new REST().setToken(ClientData.getToken());

        (async () => {
            try {
                console.log(`[+] Refreshing ${commands.length} /commands...`);
                ClientData.getGuilds().forEach(async id => {
                    await rest.put(
                        Routes.applicationGuildCommands(ClientData.getBotId(), id),
                        { body: commands },
                    );
                })
                console.log(`[+] Finished refreshing /commands!`);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}
