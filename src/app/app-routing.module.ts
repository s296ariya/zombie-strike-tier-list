import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroComponent } from "./hero/hero.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "heroes/:heroCode", component: HeroComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }