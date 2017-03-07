import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router, NavigationStart }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import { ListingService } from '../shared/listing-service';
import { PagerService } from '../shared/pager-service';
import { SinglePageService } from '../shared/single_page-service';

import { Property } from '../shared/property';


@Component({
  selector: 'property-list',
  templateUrl: 'property-list.component.html',
  styleUrls: ['property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  place: string;
  data: any;
  pages: number;
  listings: Property[];
  loading: boolean;
  curPath: string;
  coords = {
    'latitude': 0,
    'longitude': 0
  };

  favorites: any;
  favoritesKeys: any;

  pager: any = {};
  pagedItems: any[];
  currentPage: number = 1;

  itemsPerPage: number = 24;

  constructor(
    private listingService: ListingService,
    private pagerService: PagerService,
    private singlePageService: SinglePageService,
    private route: ActivatedRoute,
    private location: Location,

  ) {

    let favAndKeys = this.listingService.getFavorites();
    this.favoritesKeys = favAndKeys[0];
    this.favorites = favAndKeys[1];
    this.curPath = this.location.path().split('/')[1];
  }

  toggleFavorites(house){
    let id = '' + this.getHouseId(house);

    var pos = this.favoritesKeys.indexOf(id);
    if (pos > -1) {
      this.favoritesKeys.splice(pos, 1);
      delete this.favorites[id];
    }
    else {
      this.favoritesKeys.push(id);
      this.favorites[id] = house;
    }
  }

  getHouseId(house: any){
    return this.listingService.getId(house.lister_url);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.data.response.total_results, page, this.itemsPerPage);
    this.pagedItems = this.listings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = this.pager.currentPage;
  }

  sendRequest (place?: string, itemsPerPage = 24, page = 1 , coords?) {
    this.loading = true;

    //console.log(this.place, this.coords, place, coords, this.currentPage);

    if (place) {
      //console.log(this.place);
      if ((this.place && this.place != place) || !this.place) this.currentPage = 1;
      this.place = place;
    }

    if (coords) {
      if (this.coords &&
          (this.coords.latitude != coords.latitude ||
           this.coords.longitude != coords.longitude) ||
          !this.coords) this.currentPage = 1;
      this.coords = coords;
    }


    this.coords = coords;
    this.listingService.getListing(place, itemsPerPage, page, coords).subscribe(
      data => {
        this.data = data;
        this.listings = this.data.response.listings;
        this.pages = this.data.response.total_pages;

        this.setPage(this.currentPage);
      },
      err => console.error(err),
      () => {
        console.log('success');
        this.loading = false;
      }
    );
    if(place) this.location.go('/search/place/' + place + '/' + page);
    else if(coords) this.location.go('/search/coords/' + coords['latitude'] + ',' +
                                      coords['longitude'] + '/' + page);

  }

  ngOnInit() {
    this.route.params
      .map(params => params)
      .subscribe((params) => {
      console.log(params);
        if (params['place']) {

          this.currentPage = +params['page'];
          this.sendRequest(params['place'], this.itemsPerPage, +params['page']);
        }
        else if (params['coords']) {

          this.currentPage = +params['page'];
          this.coords.latitude = params['coords'].split(',')[0];
          this.coords.longitude = params['coords'].split(',')[1];

          this.sendRequest(null, this.itemsPerPage, +params['page'], this.coords);
        }
      })
  }

}


