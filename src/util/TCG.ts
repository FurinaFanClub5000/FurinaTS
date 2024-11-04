import { ChatInputCommandInteraction, User } from "discord.js"
import TCG from "../../resources/tcg/TCGData.json"
import { BattleInfo } from "../tcg/battle"

interface TCGDataJsonStruct {
    id: number,
    name: string,
    icon: string,
    release: boolean // False cards won’t be able to use
}

const TCGData: TCGDataJsonStruct[] = TCG
TCGData.push({
    id: -1,
    name: "Unidentified",
    icon: "",
    release: false
})


export interface TCGCurrentDeck {
    id: number, // USER ID
    characters: number[], // ID LIST
    cards: number[] // ID LIST
}


export class TCGUtil {

    public static currentBattlePlayers = []

    public static getTCGData(): TCGDataJsonStruct[] {
        return TCGData
    }

    public static getCardData(id: number): TCGDataJsonStruct {
        return TCGData.find(s => s.id === id) || TCGData.find(s => s.id === -1)!
    }

    public static generateBattleId(): number {
        return this.currentBattlePlayers.length+1
    }

}

export default class TCGBattle {

    public battleInfo: BattleInfo
    public deckIdList: TCGCurrentDeck[]

    constructor(users: User[]) {
        this.battleInfo = {
            battleId: TCGUtil.generateBattleId(),
            info: [
                {
                    player: users[0].displayName,
                    id: users[0].id,
                    profilePicture: users[0].avatarURL() as string,
                    summons: [],
                    cards: [],
                    dices: [],
                    characters: []
                },
                {
                    player: users[1].displayName,
                    id: users[1].id,
                    profilePicture: users[1].avatarURL() as string,
                    summons: [],
                    cards: [],
                    dices: [],
                    characters: []
                }
            ]
        }
        this.deckIdList = []
    }

    public init(interaction: ChatInputCommandInteraction) {
        console.log(`[TCG] Initiating...\n${this.battleInfo}\n${this.deckIdList}`)
        
    }

}