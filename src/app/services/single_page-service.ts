import { Injectable } from '@angular/core';

@Injectable()
export class SinglePageService {

  houseInfo: any;

  setHouseInfo(info) {
    this.houseInfo = JSON.stringify(info);
    localStorage.setItem('lastSeen', JSON.stringify(info));
  }

  getHouseInfo() {
    return this.houseInfo ? this.houseInfo : localStorage.getItem('lastSeen');
  }

}
