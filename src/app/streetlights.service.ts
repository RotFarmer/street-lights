import { Injectable } from '@angular/core';
import { googleKey } from './secrets';
console.log(googleKey);

@Injectable({
  providedIn: 'root',
})
export class StreetlightsService {
  constructor() {}
}
