/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardsApiService } from './cards-api.service';

describe('Service: CardsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardsApiService]
    });
  });

  it('should ...', inject([CardsApiService], (service: CardsApiService) => {
    expect(service).toBeTruthy();
  }));
});
