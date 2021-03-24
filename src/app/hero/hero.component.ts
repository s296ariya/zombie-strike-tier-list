import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ParameterStore, Store } from "../store";
import { Hero } from "../model/hero.model";

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
}