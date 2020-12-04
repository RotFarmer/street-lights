import { TestBed } from '@angular/core/testing';

import { StreetlightsService } from './streetlights.service';

describe('StreetlightsService', () => {
  let service: StreetlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
