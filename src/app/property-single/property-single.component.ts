import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';

import { SinglePageService } from '../services/single_page-service';
import { Property } from '../services/property';


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
