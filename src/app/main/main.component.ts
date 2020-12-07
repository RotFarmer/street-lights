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
  places:any[] = [
    {
      name: "the edge",
      address: "4149 18th street san fransisco california 94114",
      phone: "+14158634027",
      info: "this is a bar",
      safety: "lgbt",
      lat: 37.7607392,
      lng: -122.4381946,
    }
  ];
  // infoContent = ""
  locationName = "";
  locationAddress = "";
  locationPhone = "";
  locationInfo = "";
  // locationSafety = "";

  constructor() {}

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 37.7607392,
        lng: -122.4381946,
      };
    // });
    this.places.forEach((place)=>{
      this.addMarker(place)
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  openInfo(marker:MapMarker, content){
    console.log(marker);
    this.locationName = content.name;
    this.locationAddress = content.address;
    this.locationPhone = content.phone;
    this.locationInfo = content.info;
    this.infoWindow.open(marker);
  }

  addMarker(place):void {
    this.markers.push({
      position: {
        lat: place.lat,
        lng: place.lng,
      },
      label: {
        color: 'green',
        text: place.name,
      },
      title: place.name,
      name: place.name,
      address: place.address,
      phone: place.phone,
      info: place.info,
      safety: place.safety
    });
    console.log(this.markers);
  }

  // click(event: google.maps.MouseEvent) {
  //   let lat = event.latLng.lat();
  //   let lng = event.latLng.lng();
  //   this.addMarker(lat,lng)
  // }
}
