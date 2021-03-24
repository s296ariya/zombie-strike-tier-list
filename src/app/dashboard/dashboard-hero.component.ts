import { Component, Input, OnInit } from "@angular/core";
import { ParameterStore, Store } from "../store";
import { HeroBuild } from "../model/hero-build.model";
import { Router } from "@angular/router";

@Component({
    selector: "dashboard-hero",
    templateUrl: "./dashboard-hero.component.html",
    styleUrls: ["./dashboard-hero.component.css"]
})
export class DashboardHeroComponent {
    @Input()
    public heroBuild: HeroBuild;
    @Input()
    private categoryKey: string;
    @Input()
    private tierName: string;
    public showJewelAccessory: boolean;

    constructor(private router: Router, private store: Store, private parameterStore: ParameterStore) {
    }

    ngOnInit() {
        this.showJewelAccessory = this.isShowJewelAccessory();
    }

    navigate(url: string) {
        this.parameterStore.categoryKey = this.categoryKey;
        this.parameterStore.heroBuildCode = this.heroBuild.code;
        this.router.navigateByUrl(url);
    }

    isShowJewelAccessory() {
        let evolutionLevelMap = new Map<string, number>();
        this.store.heroBuildPlacementsCategoryHeroMap
            .get(this.categoryKey)
            .get(this.heroBuild.hero.code)
            .forEach(heroBuildTierPlacement => {
                let key = heroBuildTierPlacement.heroBuild.evolution + heroBuildTierPlacement.heroBuild.level;
                if (!evolutionLevelMap.has(key)) {
                    evolutionLevelMap.set(key, 0);
                }
                evolutionLevelMap.set(key, evolutionLevelMap.get(key) + 1);
            });
        return evolutionLevelMap.get(this.heroBuild.evolution + this.heroBuild.level) > 1;
    }
}