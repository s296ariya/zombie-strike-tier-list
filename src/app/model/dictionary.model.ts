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

    constructor() {
        this.attack = 0;
        this.attackPercent = 0;
        this.health = 0;
        this.healthPercent = 0;
        this.armor = 0;
        this.speed = 0;
        this.skillDamage = 0;
        this.hit = 0;
        this.dodge = 0;
        this.crit = 0;
        this.critDamage = 0;
        this.armorBreak = 0;
        this.controlImmune = 0;
        this.reduceDamage = 0;
        this.trueDamage = 0;
        this.energy = 0;
        this.continuousDamage = 0;
        this.reduceContinuousDamage = 0;
        this.stunImmune = false;
        this.freezeImmune = false;
        this.petrifyImmune = false;
        this.silenceImmune = false;
    }

    add(stats:Stats) {
        this.attack += stats.attack;
        this.attackPercent += stats.attackPercent;
        this.health += stats.health;
        this.healthPercent += stats.healthPercent;
        this.armor += stats.armor;
        this.speed += stats.speed;
        this.skillDamage += stats.skillDamage;
        this.hit += stats.hit;
        this.dodge += stats.dodge;
        this.crit += stats.crit;
        this.critDamage += stats.crit;
        this.armorBreak += stats.armor;
        this.controlImmune += stats.controlImmune;
        this.reduceDamage += stats.reduceDamage;
        this.trueDamage += stats.trueDamage;
        this.energy += stats.energy;
        this.continuousDamage += stats.continuousDamage;
        this.reduceContinuousDamage += stats.reduceContinuousDamage;
        this.stunImmune = this.stunImmune || stats.stunImmune;
        this.freezeImmune = this.freezeImmune || stats.freezeImmune;
        this.petrifyImmune = this.petrifyImmune || stats.petrifyImmune;
        this.silenceImmune = this.silenceImmune || stats.silenceImmune;
    }
}
