import ClientJson from "../../resources/client.json";

interface ClientStruct {
    token: string,
    botId: string
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

}