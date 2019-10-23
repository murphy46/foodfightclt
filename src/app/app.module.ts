import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ClarityModule} from "@clr/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { VoteFormComponent } from './vote-form/vote-form.component';
import {UtilityService} from "./utility.service";
import { EventComponent } from './event/event.component';
import { PieCompetitionComponent } from './pie-competition/pie-competition.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { BidFormComponent } from './bid-form/bid-form.component';
import { SumoComponent} from './sumo/sumo.component';
import { NominateFormComponent } from './nominate-form/nominate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteFormComponent,
    EventComponent,
    PieCompetitionComponent,
    LandingPageComponent,
    MarketplaceComponent,
    BidFormComponent,
    SumoComponent,
    NominateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UtilityService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
