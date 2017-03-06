import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';

import { SinglePageService } from '../shared/single_page-service';
import { Property } from '../shared/property';


@Component({
  selector: 'property-single',
  inputs: ['house', 'houseId'],
  templateUrl: './property-single.component.html',
  styleUrls: ['./property-single.component.css']
})

export class PropertySingleComponent implements OnInit {

  @Input() house;
  houseId;

  constructor(
    private singlePageService: SinglePageService,
  ) {
    this.house = JSON.parse(this.singlePageService.getHouseInfo());
    console.log(this.house);
  }

  ngOnInit() {
  }

}
