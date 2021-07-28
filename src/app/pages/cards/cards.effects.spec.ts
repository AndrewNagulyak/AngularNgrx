import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CardsEffects } from './cards.effects';

describe('CardsEffects', () => {
  let actions$: Observable<any>;
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CardsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
