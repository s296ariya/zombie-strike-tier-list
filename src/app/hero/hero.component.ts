import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ParameterStore, Store } from "../store";
import { Hero } from "../model/hero.model";
import { Stats } from "../model/dictionary.model";
import { HeroBuild } from "../model/hero-build.model";

@Component({
    selector: "hero",
    templateUrl: "./hero.component.html",
    styleUrls: ["./hero.component.css"]
})
export class HeroComponent {
    public hero: Hero;
    private _categoryKey: string;
    private _heroBuildCode: string;

    constructor(private route: ActivatedRoute, public store: Store, private parameterStore: ParameterStore) {
        route.params.subscribe(params => {
            let heroCode = params["heroCode"];
            if (store.heroes.has(heroCode)) {
                this.hero = store.heroes.get(heroCode);
            } else {
                console.log(`/heroes/${heroCode} not found`);
            }
            this._categoryKey = parameterStore.categoryKey;
            this._heroBuildCode = parameterStore.heroBuildCode;
        });
    }

    selectedCategoryIndex() {
        if (!this._categoryKey) {
            return 0;
        }
        return this.store.categories
            .findIndex(category => category.key == this._categoryKey);
    }

    selectedHeroBuildIndex() {
        if (!this._heroBuildCode) {
            return 0;
        }
        return this.store.heroBuildPlacementsCategoryHeroMap
            .get(this._categoryKey)
            .get(this.hero.code)
            .findIndex(heroBuildTierPlacement => heroBuildTierPlacement.heroBuild.code == this._heroBuildCode);
    }

    getCombinedStats(heroBuild:HeroBuild) {
        let combinedStats = new Stats();
        combinedStats.add(this.hero.talents.e1Talents[heroBuild.talents.e1Talent - 1].stats);
        combinedStats.add(this.hero.talents.e2Talents[heroBuild.talents.e2Talent - 1].stats);
        combinedStats.add(this.hero.talents.e3Talents[heroBuild.talents.e3Talent - 1].stats);
        combinedStats.add(this.hero.talents.e4Talent.stats);
        combinedStats.add(heroBuild.jewel.stats);
        combinedStats.add(heroBuild.accessory.stats);

        return combinedStats;
    }
}