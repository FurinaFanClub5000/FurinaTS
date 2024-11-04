import { Card, SummonInfo } from "./cards"

export type EquipType = "Artifact" | "Weapon" | "Talent"

export interface Equips {
    id: number,
    type: EquipType
    name: string
}

export interface Attachment {
    id: number
}

export interface Characters {
    id: number,
    name: string,
    equips: Equips[],  // NOT IMPLEMENTED
    stats: {
        curHp: number,
        curEnergy: number
    },
    attachments: Attachment[] // NOT IMPLEMENTED
}

export interface Dice {
    type: number,
    amount: number
}

export interface BattlePlayerInfo {
    player: string,
    id: string,
    profilePicture: string,
    dices: Dice[],
    summons: SummonInfo[]
    cards: Card[]
    characters: Characters[]
}

export interface BattleInfo {
    battleId: number,
    info: BattlePlayerInfo[]
}