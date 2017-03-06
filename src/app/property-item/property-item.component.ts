import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { SinglePageService } from '../shared/single_page-service';

import { Property } from '../shared/property';


@Component({
  selector: 'property-item',
  inputs: ['house', 'houseId'],
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {

  private el: HTMLElement;
  imgWidth;
  imgHeight;
  @Input() house : Property;
  houseId;

  @Output() toggleFavs = new EventEmitter();


  constructor(
    el: ElementRef,
    private singlePageService: SinglePageService,
  ) {
    this.el = el.nativeElement;
  }

  toggleFavorites() {
    if(localStorage.getItem(this.houseId)) {
      localStorage.removeItem(this.houseId);
    }
    else {
      let stringified = JSON.stringify(this.house);
      //console.log(stringified);
      localStorage.setItem(this.houseId, stringified);
    }
    this.house.isInFavorites = !this.house.isInFavorites;
    this.toggleFavs.emit(this.house);
    return false;
  }

  getId() {
    console.log(this.houseId);
  }

  mouseOver($event) {
    //console.log('Mouse over the star', $event.target);
    if(!this.house.isInFavorites){
      $event.target.classList.toggle("glyphicon-star-empty");
      $event.target.classList.toggle("glyphicon-star");
      $event.target.classList.toggle("gold");
    }
  }

  mouseLeave($event) {
    //console.log('Mouse left the star', $event.target);
    if(!this.house.isInFavorites) {
      $event.target.classList.toggle("glyphicon-star-empty");
      $event.target.classList.toggle("glyphicon-star");
      $event.target.classList.toggle("gold");
    }
  }


  sendHouseInfo(info) {
    this.singlePageService.setHouseInfo(info);
  }

  ngOnInit() {
    if (localStorage.getItem(this.houseId)) {
      this.house.isInFavorites = true;
    }
    //console.log(`House with id ${this.houseId} created`);
    let imgContainer = this.el.querySelector('.img_container');
    this.imgWidth = imgContainer.clientWidth;
    this.imgHeight = this.imgWidth * 0.75;
    //console.log(imgContainer);
  }

}
