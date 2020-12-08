import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { googleKey } from './secrets';
console.log(googleKey);

@Injectable({
  providedIn: 'root',
})
export class StreetlightsService {
  baseUrl: string = 'http://localhost:3000/places';
  constructor(private http: HttpClient) {}

  getPlaces = (): any => {
    return this.http.get(`${this.baseUrl}`);
  };
}
