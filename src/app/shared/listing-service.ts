import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListingService {

  private apiUrl = 'http://api.nestoria.co.uk/api';
  listing : any;

  constructor(private http: Http) { }

  getListing (place?: string, numres = 24, page = 1, coords?) {
    //console.log(place);
    let params = new URLSearchParams();
    params.set('country', 'uk');
    params.set('pretty', '1');
    params.set('action', 'search_listings');
    params.set('encoding', 'json');
    params.set('listing_type', 'buy');
    params.set('number_of_results', numres.toString());
    params.set('page', page.toString());

    if (place) params.set('place_name', place);
    else if (coords) params.set('centre_point', coords['latitude'] + ',' + coords['longitude']);

    let jsonUrl = this.apiUrl + '?' + params.toString();
    console.log(jsonUrl);
    let proxy = 'https://cors-anywhere.herokuapp.com/';

    return this.http.get(proxy + jsonUrl)
      .map((res:Response) => res.json());
  }


  getPathname(url: string) {
    let l = document.createElement("a");
    l.href = url;
    let pathname = l.pathname;
    //console.log(pathname);
    return pathname;
  }

  getId(url: string) {
    let pathname = this.getPathname(url);
    let id = parseInt(pathname.split('/')[2]);
    //console.log(id);
    return id;
  }

  getFavorites() {
    var favorites = {}, keys = [];
    if (localStorage.length > 0) {
      for (let id in localStorage) {
        if (!isNaN(+id)) {
          keys.push(id);
          favorites[id] = JSON.parse(localStorage[id]);
        }
      }
    }
    return [keys, favorites];
  }

  private handleError(error : any) {
    console.error('Произошла ошибка', error);
    return Promise.reject(error.message || error);
  }

}
