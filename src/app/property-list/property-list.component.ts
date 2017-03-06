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
  //
  // setQueryParams (formContent) {
  //   this.queryParams['place'] = formContent.place;
  // }

  // formQueryParams(queryParamObj){
  //   let params: URLSearchParams = new URLSearchParams();
  //   for (let key in queryParamObj) {
  //     params.set(key, queryParamObj[key]);
  //   }
  //   return params;
  // }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.data.response.total_results, page, this.itemsPerPage);
    this.pagedItems = this.listings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = this.pager.currentPage;
  }

  sendRequest (place: string, itemsPerPage = 24, page = 1) {
    this.loading = true;
    this.place = place;
    this.listingService.getListing(place, itemsPerPage, page).subscribe(
      data => {
        this.data = data;
        this.listings = this.data.response.listings;
        this.pages = this.data.response.total_pages;

        this.setPage(this.currentPage);
      },
      err => console.error(err),
      () => {
        //console.log('success');
        this.loading = false;
      }
    );
    this.location.go('/search/' + place + '/' + page);

  }

  ngOnInit() {
    this.route.params
      .map(params => params)
      .subscribe((params) => {
        if(params['place']) {
          this.currentPage = +params['page'];
          this.sendRequest(params['place'], 24, +params['page']);
        }
      })
  }

}


