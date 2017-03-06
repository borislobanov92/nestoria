import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor() { }

  myGeolocation: any;
  //formContent;

  @Output() submitForm = new EventEmitter();

  onSubmit (formContent) {
    //console.log('clicked', formContent);
    this.submitForm.emit(formContent);
  }


  getMyLocation() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  setPosition(position){
    this.myGeolocation = position.coords;
    //console.log(this.location);
  }

  ngOnInit() {
  }

}
