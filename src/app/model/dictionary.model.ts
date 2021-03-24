import { Type } from "class-transformer";

export class Accessory {
    code: string;
    name: string;
    imageName: string;
    @Type(() => Stats)
    stats: Stats;
}

export class Class {
    code: string;
    name: string;
    imageName: string;
    @Type(() => Stats)
    guildTechStats: Stats;
}

export class Faction {
    code: string;
    name: string;
    imageName: string;
    colour: string;
    order: number;
}

export class Jewel {
    code: string;
    name: string;
    imageName: string;
    @Type(() => Stats)
    stats: Stats;
}

export class Mechanic {
    code: string;
    name: string;
    category: string;
    description: string;
}

export class Stats {
    attack: number;
    attackPercent: number;
    health: number;
    healthPercent: number;
    armor: number;
    speed: number;
    skillDamage: number;
    hit: number;
    dodge: number;
    crit: number;
    critDamage: number;
    armorBreak: number;
    controlImmune: number;
    reduceDamage: number;
    trueDamage: number;
    energy: number;
    continuousDamage: number;
    reduceContinuousDamage: number;
    stunImmune: boolean;
    freezeImmune: boolean;
    petrifyImmune: boolean;
    silenceImmune: boolean;
}
