import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HeroComponent } from "./hero.component";

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MatTooltipModule
    ],
    declarations: [
        HeroComponent
    ],
    bootstrap: [
    ],
    providers: [
    ]
})
export class HeroModule {
}