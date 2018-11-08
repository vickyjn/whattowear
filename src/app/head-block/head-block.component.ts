import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-head-block',
  templateUrl: './head-block.component.html',
  styleUrls: ['./head-block.component.css']
})
export class HeadBlockComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() currentDate;

  @Input() config;
  @Output() updateLocation = new EventEmitter();
  @Output() updateLocationString = new EventEmitter();
  lat: Number = 44.63;
  lon: Number = 28.77;
  nLat: Number;
  nLon: Number;
  @Input() sQuery: String;
  showEdit: Boolean = false;
  constructor() { }

  ngOnInit() {
    this.getLocation();
   console.log(this.currentDate);
  }

  ngOnChanges() {
    this.nLat = this.lat;
    this.nLon = this.lon;

  }

  getLocation() {
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        self.lat = position.coords.latitude;
        self.lon = position.coords.longitude;
        self.updateLocation.emit(position);
      });
    } else {

    }
  }

  setNewLocation() {
    const loc = this.sQuery;
    this.updateLocationString.emit(loc);
  }

}
