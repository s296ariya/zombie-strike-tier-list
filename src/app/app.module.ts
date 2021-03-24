import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HeroModule } from "./hero/hero.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ParameterStore, Store } from "./store";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        DashboardModule,
        HeroModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        Store,
        ParameterStore
    ]
})
export class AppModule {
}