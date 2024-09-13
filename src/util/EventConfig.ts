import { Events } from "discord.js";

const eventConfig = {
    [Events.ClientReady]: "events/ready.ts",
    [Events.MessageCreate]: "events/message.ts",
    [Events.InteractionCreate]: "events/interaction.ts",
    [Events.MessageReactionAdd]: "events/react.ts"
};

interface EventConfigStruct {
    [event: string]: string;
}

const eventConfigData: EventConfigStruct = eventConfig;

export default class EventConfigData {

    private constructor() { }

    public static getEventFilePath(event: Events): string {
        return eventConfigData[event];
    }

    public static getEventConfig(): EventConfigStruct {
        return eventConfigData
    }

}
