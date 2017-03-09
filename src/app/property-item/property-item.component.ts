import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { SinglePageService } from '../services/single_page-service';

import { Property } from '../services/property';


@Component({
  selector: 'property-item',
  inputs: ['house', 'houseId', 'isFavorite'],
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {

  private el: HTMLElement;
  imgWidth;
  imgHeight;
  @Input() house: any;
  houseId;
  isFavorite;

  @Output() toggleFavs = new EventEmitter();


  constructor(
    el: ElementRef,
    private singlePageService: SinglePageService,
  ) {
    this.el = el.nativeElement;
  }


  toggleFavorites() {
    this.toggleFavs.emit(this.house);
    return false;
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
    //console.log(this.house);
    if (localStorage.getItem(this.houseId)) {
      this.house.isInFavorites = true;
    }
    let imgContainer = this.el.querySelector('.img_container');
    this.imgWidth = imgContainer.clientWidth;
    this.imgHeight = this.imgWidth * 0.75;
  }

}
