import { ChatInputCommandInteraction, User } from "discord.js"
import TCG from "../../resources/tcg/TCGData.json"

interface TCGDataJsonStruct {
    id: number,
    name: string,
    icon: string,
    release: boolean, // False cards won’t be able to use
    type: string
}

const TCGData: TCGDataJsonStruct[] = TCG
TCGData.push({
    id: -1,
    name: "Unidentified",
    icon: "",
    release: false,
    type: "CardExperience"
})


export class TCGUtil {

    public static currentBattlePlayers = []

    public static getTCGData(): TCGDataJsonStruct[] {
        return TCGData
    }

    public static getCardData(id: number): TCGDataJsonStruct {
        return TCGData.find(s => s.id === id) || TCGData.find(s => s.id === -1)!
    }

    public static getCardDataFromName(name: string): TCGDataJsonStruct {
        return TCGData.find(s => s.name.toLowerCase() === name.toLowerCase()) || TCGData.find(s => s.id === -1)!
    }

    public static getCardDataFromType(type: string): TCGDataJsonStruct[] {
        const t: TCGDataJsonStruct[] = []
        TCGData.forEach(s => {
            if (s.type === type) {
                t.push(s)
            }
        })
        return t
    }

}