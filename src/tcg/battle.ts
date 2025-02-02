export interface buff {
    buffId: number
    rounds: number
}

export interface lineupCharacter {
    characterId: number,
    maxHp: number
    curHp: number,
    sp: number
    equipId: number
    relicId: number
    buffs: buff[]
}

export interface summonInfo {
    summonId: number,
    rounds: number
}

export interface matchBattleData {
    [userId: string]: {
        lineup: lineupCharacter[],
        summon: summonInfo[]
    },
}