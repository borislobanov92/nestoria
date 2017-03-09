import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {

  favorites: FirebaseListObservable<any[]>;


  getFavorites() {
    this.favorites = this.af.database.list('/favorites') as FirebaseListObservable<any[]>;
    return this.favorites;
  }


   addToFavorites(newHouse){
    return this.favorites.push(newHouse);
   }


  removeFromFavorites(key) {
    this.favorites.remove(key);
  }


  constructor(private af:AngularFire) {

  }

}
