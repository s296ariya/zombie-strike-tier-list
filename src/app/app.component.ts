import { Component, VERSION, OnInit } from "@angular/core";
import { Accessory, Class, Faction, Jewel, Mechanic } from "./model/dictionary.model";
import { plainToClass } from "class-transformer";

import { environment } from "../environments/environment";
import dictionaryJson from "../../static/json/dictionary.json";
import heroesJson from "../../static/json/hero.json";
import heroBuildsJson from "../../static/json/herobuild.json";
import tiersJson from "../../static/json/tier.json";
import { Store } from "./store";
import { Hero } from "./model/hero.model";
import { HeroBuild, HeroBuildTierPlacement } from "./model/hero-build.model";
import { Category, Tier } from "./model/tier.model";

@Component({
    selector: "zombie-strike-tier-list",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    name = "Angular " + VERSION.major;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.readDictionary();
        this.readHero();
        this.readTiers();
        this.readBuilds();
        this.sortTierList();
    }

    readDictionary() {
        // accessories
        for (let accessoryJson in dictionaryJson.accessories) {
            let accessory = plainToClass(Accessory, dictionaryJson.accessories[accessoryJson]);
            this.store.accessories.set(accessory.code, accessory);
        }
        // classes
        for (let classJson in dictionaryJson.classes) {
            let clazz = plainToClass(Class, dictionaryJson.classes[classJson]);
            this.store.classes.set(clazz.code, clazz);
        }
        // factions
        for (let factionJson in dictionaryJson.factions) {
            let faction = plainToClass(Faction, dictionaryJson.factions[factionJson]);
            this.store.factions.set(faction.code, faction);
        }
        // jewels
        for (let jewelJson in dictionaryJson.jewels) {
            let jewel = plainToClass(Jewel, dictionaryJson.jewels[jewelJson]);
            this.store.jewels.set(jewel.code, jewel);
        }
        // mechanics
        for (let mechanicJson in dictionaryJson.mechanics) {
            let mechanic = plainToClass(Mechanic, dictionaryJson.mechanics[mechanicJson]);
            this.store.mechanics.set(mechanic.code, mechanic);
        }
        this.debugLog(this.store);
    }

    readHero() {
        for (let heroJson of heroesJson) {
            let hero = plainToClass(Hero, heroJson);
            // hero class
            if (this.store.classes.has(heroJson.class)) {
                hero.class = this.store.classes.get(heroJson.class);
            } else {
                this.debugLog(`readHero() ${hero.name} Class ${heroJson.class} not found`);
            }
            // hero faction
            if (this.store.factions.has(heroJson.faction)) {
                hero.faction = this.store.factions.get(heroJson.faction);
            } else {
                this.debugLog(`readHero() ${hero.name} Faction ${heroJson.faction} not found`);
            }
            // hero mechanics
            hero.mechanics = [];
            for (let mechanic of heroJson.mechanics) {
                if (this.store.mechanics.has(mechanic)) {
                    hero.mechanics.push(this.store.mechanics.get(mechanic));
                } else {
                    this.debugLog(`readHero() ${hero.name} Mechanic ${mechanic} not found`);
                }
            }
            this.store.heroes.set(hero.code, hero);
        }
    }

    readTiers() {
        for (let category of tiersJson.categories) {
            this.store.categories.push(plainToClass(Category, category));
        }
        for (let category in tiersJson.tiers) {
            this.store.heroBuildPlacementsCategoryHeroMap.set(category, new Map<string, HeroBuildTierPlacement[]>());
            this.store.heroBuildPlacementsCategoryTierMap.set(category, new Map<string, HeroBuildTierPlacement[]>());
            this.store.tierList.set(category, []);
            for (let tier of tiersJson.tiers[category]) {
                this.store.heroBuildPlacementsCategoryTierMap.get(category).set(tier.name, []);
                this.store.tierList.get(category).push(plainToClass(Tier, tier));
            }
        }
    }

    readBuilds() {
        for (let buildJson of heroBuildsJson) {
            let build = plainToClass(HeroBuild, buildJson);
            // build hero
            if (this.store.heroes.has(buildJson.hero)) {
                build.hero = this.store.heroes.get(buildJson.hero);
            } else {
                this.debugLog(`readBuilds() ${build.hero} Hero ${buildJson.hero} not found`);
            }
            // build accessory
            if (this.store.accessories.has(buildJson.accessory)) {
                build.accessory = this.store.accessories.get(buildJson.accessory);
            } else {
                this.debugLog(`readBuilds() ${build.hero} Accessory ${buildJson.accessory} not found`);
            }
            // build jewel
            if (this.store.jewels.has(buildJson.jewel)) {
                build.jewel = this.store.jewels.get(buildJson.jewel);
            } else {
                this.debugLog(`readBuilds() ${build.hero} Jewel ${buildJson.jewel} not found`);
            }
            this.store.heroBuilds.push(build);
            for (let category of this.store.categories) {
                let categoryHeroMap = this.store.heroBuildPlacementsCategoryHeroMap.get(category.key);
                if (!categoryHeroMap.has(buildJson.hero)) {
                    categoryHeroMap.set(buildJson.hero, []);
                }
            }
            for (let placement of buildJson.placements) {
                let categoryHeroMap = this.store.heroBuildPlacementsCategoryHeroMap.get(placement.categoryKey);
                if (!categoryHeroMap.has(buildJson.hero)) {
                    categoryHeroMap.set(buildJson.hero, []);
                }
                categoryHeroMap.get(buildJson.hero).push(<HeroBuildTierPlacement>({heroBuild: build, placement: placement}));

                let categoryTierMap = this.store.heroBuildPlacementsCategoryTierMap.get(placement.categoryKey);
                categoryTierMap.get(placement.tierName).push(<HeroBuildTierPlacement>({heroBuild: build, placement: placement}));
            }
        }
    }

    sortTierList() {
        for (let category of this.store.categories) {
            for (let tier of this.store.tierList.get(category.key)) {
                this.store.heroBuildPlacementsCategoryTierMap.get(category.key)
                    .get(tier.name)
                    .sort((a, b) => {
                        let aFactionOrder = a.heroBuild.hero.faction.order;
                        let bFactionOrder = b.heroBuild.hero.faction.order;
                        if (aFactionOrder != bFactionOrder) {
                            return aFactionOrder - bFactionOrder;
                        }
                        if (a.heroBuild.hero.name.localeCompare(b.heroBuild.hero.name) != 0) {
                            return a.heroBuild.hero.name.localeCompare(b.heroBuild.hero.name);
                        }
                        return a.heroBuild.code.localeCompare(b.heroBuild.code);
                    });
            }
            for (let hero of this.store.heroes.keys()) {
                let categoryHeroMap = this.store.heroBuildPlacementsCategoryHeroMap.get(category.key);
                if (categoryHeroMap.has(hero)) {
                    categoryHeroMap.get(hero)
                        .sort((a, b) => {
                            let aTierOrder = this.store.tierList.get(category.key).find(tier => tier.name == a.placement.tierName).order;
                            let bTierOrder = this.store.tierList.get(category.key).find(tier => tier.name == b.placement.tierName).order;
                            if (aTierOrder != bTierOrder) {
                                return aTierOrder - bTierOrder;
                            }
                            return a.heroBuild.code.localeCompare(b.heroBuild.code);
                        });
                }

                // let categoryHeroMap = this.store.heroBuildPlacementsCategoryHeroMap.get(category.key);
                // categoryHeroMap.set(hero, categoryHeroMap
                //     .get(hero)
                //     .sort((a, b) => this.store.tierList.get(category.key).find(tier => tier.name == a.placement.tierName).order -
                //         this.store.tierList.get(category.key).find(tier => tier.name == b.placement.tierName).order));
                // console.log(categoryHeroMap
                //     .get(hero)
                //     .sort((a, b) => this.store.tierList.get(category.key).find(tier => tier.name == a.placement.tierName).order -
                //         this.store.tierList.get(category.key).find(tier => tier.name == b.placement.tierName).order));
            }
        }
    }

    debugLog(text) {
        if (!environment.production) {
            console.log(text);
        }
    }
}