import { Accessory, Jewel, Mechanic, Stats } from "./dictionary.model";
import { Type } from "class-transformer";
import { Hero } from "./hero.model";

export class HeroBuild {
    code: string;
    hero: Hero;
    evolution: string;
    level: number;
    accessory: Accessory;
    jewel: Jewel;
    @Type(() => TalentBuild)
    talents: TalentBuild;
    @Type(() => Placement)
    placements: Placement[];
    private _totalStats: Stats;
    private _totalMechanics: Set<Mechanic>;

    get totalStats() {
        return this._totalStats;
    }

    get totalMechanics() {
        return this._totalMechanics;
    }
}

export class TalentBuild {
    e1Talent: number;
    e2Talent: number;
    e3Talent: number;
}

export class Placement {
    categoryKey: string;
    tierName: string;
}

export class HeroBuildTierPlacement {
    heroBuild: HeroBuild;
    placement: Placement;
}
