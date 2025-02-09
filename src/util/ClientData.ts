import "fs";
import ClientJson from "../../resources/Client.json";
import { writeFileSync } from "fs";

interface ConfigStruct {
    tspmo: boolean
}

interface ClientStruct {
    token: string,
    botId: string,
    guilds: string[],
    registerOnStart: boolean,
    config: ConfigStruct
}

const ClientJsonData:ClientStruct = ClientJson

export default class ClientData {

    private constructor() { }

    public static getToken(): string {
        return ClientJsonData.token
    }

    public static getBotId(): string {
        return ClientJsonData.botId
    }

    public static getBotIdInt(): number {
        return Number(ClientJsonData.botId)
    }

    public static getGuilds(): string[] {
        return ClientJsonData.guilds
    }

    public static isRegisterOnStart(): boolean {
        return ClientJsonData.registerOnStart
    }

    public static ispmo(): boolean {
        return ClientJsonData.config.tspmo
    }

    public static tspmo(pmo: boolean) {
        ClientJsonData.config.tspmo = pmo
    }

}