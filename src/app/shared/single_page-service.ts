import { Injectable } from '@angular/core';

@Injectable()
export class SinglePageService {

  houseInfo: any;

  setHouseInfo(info) {
    this.houseInfo = JSON.stringify(info);
    localStorage.setItem('lastSeen', JSON.stringify(info));
  }

  getHouseInfo() {
    //console.log(this.houseInfo);
    return this.houseInfo ? this.houseInfo : localStorage.getItem('lastSeen');
  }

}
