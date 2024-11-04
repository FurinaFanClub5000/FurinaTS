export interface Character {
    id: number;
    name: string;
    weapon: number;
    element: number;
    group: number;
    stats: Stats;
    attacks: Attack[];
    talents: Talent[];
}

export interface Stats {
    hp: number;
    energy: number;
}

export interface Attack {
    type: AttackType;
    damage: number;
    damageType: number;
    abilities: Ability[];
}

export type AttackType = "NormalAttack" | "AdditionalAttack" | "Skill" | "Burst";

export interface Ability {
    type: AbilityType;
    damageType?: number;
    value?: number | number[];
}

export type AbilityType = "Damage" | "Summon";

export interface Talent {
    id: number;
    condition: number[];
    abilities: TalentAbility[];
}

export interface TalentAbility {
    type: TalentAbilityType;
    value: number[];
}

export type TalentAbilityType = "Attack";

export interface SummonInfo {
    id: number,
    name: string,
    usage: number,
    maxUsage: number,
    abilities: any[]
}

export interface Card {
    id: number,
    name: number,
    usage: number,
    maxUsage: number,
    modifiers: any[]
}