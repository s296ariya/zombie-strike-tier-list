import { Injectable } from "@angular/core";
import { Accessory, Class, Faction, Jewel, Mechanic } from "./model/dictionary.model";
import { Hero } from "./model/hero.model";
import { HeroBuild, HeroBuildTierPlacement } from "./model/hero-build.model";
import { Category, Tier } from "./model/tier.model";

@Injectable()
export class Store {
    constructor() {
        this.accessories = new Map<string, Accessory>();
        this.classes = new Map<string, Class>();
        this.factions = new Map<string, Faction>();
        this.jewels = new Map<string, Jewel>();
        this.mechanics = new Map<string, Mechanic>();
        this.heroes = new Map<string, Hero>();
        this.categories = [];
        this.tierList = new Map<string, Tier[]>();
        this.heroBuilds = [];
        this.heroBuildPlacementsCategoryHeroMap = new Map<string, Map<string,HeroBuildTierPlacement[]>>();
        this.heroBuildPlacementsCategoryTierMap = new Map<string, Map<string,HeroBuildTierPlacement[]>>();
    }

    accessories: Map<string, Accessory>;
    classes: Map<string, Class>;
    factions: Map<string, Faction>;
    jewels: Map<string, Jewel>;
    mechanics: Map<string, Mechanic>;
    heroes: Map<string, Hero>;
    categories: Category[];
    tierList: Map<string, Tier[]>;
    heroBuilds: HeroBuild[];
    heroBuildPlacementsCategoryHeroMap: Map<string, Map<string,HeroBuildTierPlacement[]>>;
    heroBuildPlacementsCategoryTierMap: Map<string, Map<string,HeroBuildTierPlacement[]>>;
}

@Injectable()
export class ParameterStore {
    private _categoryKey: string;
    private _heroBuildCode: string;

    get categoryKey() {
        let returnValue = this._categoryKey;
        this._categoryKey = null;
        return returnValue;
    }

    set categoryKey(value: string) {
        this._categoryKey = value;
    }

    get heroBuildCode() {
        let returnValue = this._heroBuildCode;
        this.heroBuildCode = null;
        return returnValue;
    }

    set heroBuildCode(value: string) {
        this._heroBuildCode = value;
    }
}