import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.addMarker();
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: 42.4842613,
        lng: -83.4472283,
      },
      label: {
        color: 'green',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      // options: { animation: google.maps.Animation.BOUNCE },
    });
    console.log(this.markers);
  }

  click(event: google.maps.MouseEvent) {
    console.log(event.latLng.lat);
  }
}
