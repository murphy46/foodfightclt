import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventComponent} from "./event/event.component";
import {PieCompetitionComponent} from "./pie-competition/pie-competition.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {MarketplaceComponent} from "./marketplace/marketplace.component";
import {SumoComponent} from "./sumo/sumo.component";

const routes: Routes = [
  {path: 'events', component: EventComponent},
  {path: 'vote', component: PieCompetitionComponent},
  { path: 'home', component: LandingPageComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'sumo', component: SumoComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
