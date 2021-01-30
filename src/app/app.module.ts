import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpRequestsService} from "./http-requests.service";
import { HttpClientModule} from "@angular/common/http";
import { TeamsListComponent } from './teams-list/teams-list.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {StorageManagerService} from "./storage-manager.service";

@NgModule({
  declarations: [
    AppComponent,
    TeamsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [ HttpRequestsService,
    StorageManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
