import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { StreetlightsService } from '../streetlights.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  zoom = 15;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    styles: [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi.business',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#263c3f',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6b9a76',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#38414e',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#212a37',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9ca5b3',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#1f2835',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#f3d19c',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2f3948',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#515c6d',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
    ],
  };
  markers: any[] = [];
  userMarkers: any[] = [];
  places: any[] = [];
  placesId: number = 0;
  locationName = '';
  locationAddress = '';
  locationPhone = '';
  locationInfo = '';
  reports: any = [];
  reportId: any;
  hide: boolean = true;
  hideNew: boolean = true;
  hideReports: boolean = true;
  newLat: number;
  newLong: number;
  opened: boolean = false;

  constructor(
    private service: StreetlightsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((response) => {
      let search = response.get('search');
      if (!search) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.newLat = this.center.lat;
          this.newLong = this.center.lng;
        });
      } else {
        this.service.getLocation(search).subscribe((response) => {
          this.center = response.results[0].geometry.location;
          this.newLat = this.center.lat;
          this.newLong = this.center.lng;
        });
      }
    });

    this.getPlaces();
  }

  getPlaces = () => {
    this.service.getPlaces().subscribe((response) => {
      this.places = response;
      this.placesId = this.places[0].id;
      this.places.forEach((place) => {
        this.addMarker(place);
        if (place.id > this.placesId) {
          this.placesId = place.id;
        }
      });
      console.log(this.placesId);
    });
  };

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  openInfo(marker: MapMarker, content) {
    console.log(content);
    this.locationName = content.name;
    this.locationAddress = content.address;
    this.locationPhone = content.phone;
    this.locationInfo = content.info;
    this.infoWindow.open(marker);
    this.openReports(content);
  }

  openReports(marker) {
    this.service.getReports(marker).subscribe((response) => {
      this.reports = response;
      this.reportId = this.reports[0].place_id;
      console.log(this.reports);
    });
  }

  addMarker(place): void {
    this.markers.push({
      position: {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.long),
      },
      label: {
        color: '#fdc029',
        text: place.name,
      },
      options: {},
      title: place.name,
      name: place.name,
      address: place.address,
      phone: place.phonenumber,
      info: place.info,
      safety: place.safety,
      id: place.id,
    });
    console.log(this.markers);
  }

  addUserMarker() {
    this.userMarkers.push({
      position: this.center,
      label: {
        color: 'white',
        text: 'Click to Make a Report or Drag to a New Location',
      },
      title: 'Click to Make a Report or Drag to a New Location',
      options: { draggable: true },
    });
  }

  setMarkerLocation = (event: google.maps.MouseEvent) => {
    this.newLat = event.latLng.lat();
    this.newLong = event.latLng.lng();
  };

  openNewForm = () => {
    this.hideNew = !this.hideNew;
  };

  closeNewForm = () => {
    this.hideNew = !this.hideNew;
    this.userMarkers.splice(0);
  };

  openForm = () => {
    this.hide = !this.hide;
  };

  showReports = () => {
    this.hideReports = !this.hideReports;
  };

  submitPost = (form: NgForm) => {
    this.service.createPlace(form);
    this.placesId++;
    this.reportId = this.placesId;
    this.openNewForm();
    this.openForm();
  };

  submitReport = (form: NgForm) => {
    this.service.addReport(form);
  };

  toggleNav = () => {
    this.opened = !this.opened;
  };
}
