import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { TooltipModule } from "ngx-tooltip";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { PropertyListComponent } from "./property-list/property-list.component";

import { ListingService } from './services/listing-service';
import { PagerService } from './services/pager-service';
import { SinglePageService } from './services/single_page-service';
import { FirebaseService } from './services/firebase-service';
import { PropertyItemComponent } from './property-item/property-item.component';
import { AppRoutingModule }     from './app-routing.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PropertySingleComponent } from './property-single/property-single.component';

export const config = {
  apiKey: "AIzaSyCSuUQMCEBxbInGslvIuy8SeMDumWJW1fQ",
  authDomain: "nestoria-57df3.firebaseapp.com",
  databaseURL: "https://nestoria-57df3.firebaseio.com",
  storageBucket: "nestoria-57df3.appspot.com",
  messagingSenderId: "583526817768"
};


@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertyItemComponent,
    PageHeaderComponent,
    SearchFormComponent,
    PropertySingleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    TooltipModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    ListingService,
    PagerService,
    SinglePageService,
    FirebaseService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }

