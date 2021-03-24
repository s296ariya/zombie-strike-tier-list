import { Component } from "@angular/core";
import { Store } from "../store";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
    constructor(public store: Store) {
    }

    filteredTiers(categoryKey: string) {
        return this.store.tierList.get(categoryKey).filter(tier => tier.display)
    }
}