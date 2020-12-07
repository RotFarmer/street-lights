import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild(MapInfoWindow, {static:false}) infoWindow: MapInfoWindow;
  zoom = 5;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'map',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers: any[] = [];

  infoContent = ""

  constructor() {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    // this.addMarker();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  openInfo(marker:MapMarker, content){
    console.log(marker);
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

  addMarker(lat:number,lng:number):void {
    this.markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'green',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      // options: { animation: google.maps.Animation.BOUNCE },
      name: 'name',
      info: 'this is simply a test of our ability to manipulate data',
    });
    console.log(this.markers);
  }

  click(event: google.maps.MouseEvent) {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    this.addMarker(lat,lng)
  }
}
