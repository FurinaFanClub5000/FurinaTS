import ClientJson from "../../resources/Client.json";

interface ClientStruct {
    token: string,
    botId: string,
    guilds: string[],
    registerOnStart: boolean
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

}