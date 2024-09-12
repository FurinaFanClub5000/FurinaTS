import { Client, GatewayIntentBits } from 'discord.js';
import ClientData from './util/ClientData';
import EventConfigData from './util/EventConfig';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

async function init() {

    const eventConfig = EventConfigData.getEventConfig();
    for (const [event, path] of Object.entries(eventConfig)) {
        client.on(event, async (...args) => {
            try {
                const eventHandler = await import(`./${path}`);
                await eventHandler.default(client, ...args);
            } catch (error) {
                console.error(`[!] Failed to load event handler for ${event}:`, error);
            }
        });
    }
    await client.login(ClientData.getToken());
}

init();
