import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from './interfaces/report';
import { googleKey } from './secrets';
// console.log(googleKey);

@Injectable({
  providedIn: 'root',
})
export class StreetlightsService {
  baseUrl: string = 'http://localhost:3000/places';
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

  // userSearchCenter = (location: google.maps.LatLngLiteral) => {
  //   this.userCenter = location;
  // };

  getPlaces = (): any => {
    return this.http.get(`${this.baseUrl}`);
  };

  postReport = (report: Report): any => {
    return this.http.post(`${this.baseUrl}`, report);
  };

  createReport = (form: NgForm) => {
    let newReport = form.value;
    this.report = {
      name: newReport.name,
      address: newReport.address,
      phonenumber: newReport.phone,
      lat: newReport.lat,
      long: newReport.long,
      safe: newReport.safety,
      info: newReport.report,
    };
    console.log(this.report);
    this.postReport(this.report).subscribe(() => {});
    location.reload();
  };
}

//USE THIS TO RESET THE ID IF OUT OF SYNC
// SELECT setval('public.pride_id_seq', (SELECT MAX(id) FROM pride)+1);
