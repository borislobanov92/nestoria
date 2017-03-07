import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor() { }

  //myGeolocation: any;

  myMockGeolocation: any;

  @Output() submitForm = new EventEmitter();
  @Output() submitLocation = new EventEmitter();

  onSubmit (formContent) {
    this.submitForm.emit(formContent);
  }

  onSubmitLocation (coords) {
    this.submitLocation.emit(coords);
  }


  // Not available on insecure origins anymore
  getMyLocation() {
    this.myMockGeolocation = {
      'latitude' : 51.48352,
      'longitude': -0.124846
    }
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    // }
  }

  // setPosition(position){
  //   console.log('setposition called');
  //   this.myGeolocation = position.coords;
  //   console.log('myGeolocation set to ', this.myGeolocation);
  // }

  ngOnInit() {
    this.getMyLocation();
  }

}
