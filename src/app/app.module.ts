import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { TooltipModule } from "ngx-tooltip";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PropertyListComponent } from "./property-list/property-list.component";

import { ListingService } from './shared/listing-service';
import { PagerService } from './shared/pager-service';
import { SinglePageService } from './shared/single_page-service';
import { PropertyItemComponent } from './property-item/property-item.component';
import { AppRoutingModule }     from './app-routing.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { PropertySingleComponent } from './property-single/property-single.component';

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
  ],
  providers: [
    ListingService,
    PagerService,
    SinglePageService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }

