import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from './interfaces/report';
import { googleKey } from './secrets';
import { environment } from 'src/environments/environment';
// console.log(googleKey);

@Injectable({
  providedIn: 'root',
})
export class StreetlightsService {
  baseUrl: string = environment.apiBaseUrl;
  baseLocationUrl: string =
    'https://maps.googleapis.com/maps/api/geocode/json?';
  report: Report;

  constructor(private http: HttpClient, private router: Router) {}

  getLocation = (location: string): any => {
    return this.http.get(`${this.baseLocationUrl}`, {
      params: {
        address: location,
        key: googleKey,
      },
    });
  };

  getReports = (location: any) => {
    return this.http.get(`${this.baseUrl}/reports`, {
      params: {
        id: location.id,
      },
    });
  };
  // userSearchCenter = (location: google.maps.LatLngLiteral) => {
  //   this.userCenter = location;
  // };

  getPlaces = (): any => {
    return this.http.get(`${this.baseUrl}/places`);
  };

  postPlace = (place): any => {
    return this.http.post(`${this.baseUrl}/places`, place);
  };

  postReport = (report): any => {
    return this.http.post(`${this.baseUrl}/reports`, report);
  };

  createPlace = (form: NgForm) => {
    let newPlace = form.value;

    let place = {
      name: newPlace.name,
      address: newPlace.address,
      phonenumber: newPlace.phone,
      lat: newPlace.lat,
      long: newPlace.long,
      safe: newPlace.safety,
    };

    this.postPlace(place).subscribe(() => {});
  };

  addReport = (form: NgForm) => {
    let newReport = {
      place_id: form.value.id,
      report: form.value.report,
      date: form.value.date,
    };
    this.postReport(newReport).subscribe(() => {});
    location.reload();
  };
}

//USE THIS TO RESET THE ID IF OUT OF SYNC
// SELECT setval('public.pride_id_seq', (SELECT MAX(id) FROM pride)+1);
