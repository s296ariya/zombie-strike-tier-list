import { Class, Faction, Mechanic, Stats } from "./dictionary.model";
import { Type } from "class-transformer";

export class Hero {
    code: string;
    name: string;
    imageName: string;
    class: Class;
    faction: Faction;
    mechanics: Mechanic[];
    @Type(() => Stats)
    baseStats: Stats;
    @Type(() => Talents)
    talents: Talents;

    constructor() {
        this.mechanics = [];
    }
}

export class Talents {
    @Type(() => Talent)
    e1Talents: Talent[];
    @Type(() => Talent)
    e2Talents: Talent[];
    @Type(() => Talent)
    e3Talents: Talent[];
    @Type(() => Talent)
    e4Talent: Talent;
}

export class Talent {
    imageName: string;
    selected: boolean;
    @Type(() => Stats)
    stats: Stats;
}
