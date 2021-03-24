import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardHeroComponent } from "./dashboard-hero.component";

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MatTooltipModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent,
        DashboardHeroComponent,
    ],
    bootstrap: [
    ],
    providers: [
    ]
})
export class DashboardModule {
}