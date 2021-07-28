import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CardsActionTypes,
  LoadedAllCardsAction,
  LoadedCardByIdAction,
  RequestAllCardsAction,
  RequestedCardByIdAction
} from './cards.actions';
import {map, mergeMap} from 'rxjs/operators';
import {CardsApiService} from '../../core/api/cards-api.service';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';


@Injectable()
export class CardsEffects {
  @Effect()
  loadCard$ = this.actions$.pipe(ofType<RequestedCardByIdAction>(CardsActionTypes.RequestCardAction),
    mergeMap(action => this.cardsService.getById(action.payload.cardId)),
    map(card => new LoadedCardByIdAction({card})));

  @Effect()
  loadCards$ = this.actions$.pipe(ofType<RequestAllCardsAction>(CardsActionTypes.RequestAllCards),
    mergeMap(action => {
      return this.cardsService.getAll(action.payload.page).pipe(map((cards => {
        return {cards: cards, page: action.payload.page};
      })));
    }),
    map(cards => new LoadedAllCardsAction(cards)));

  constructor(private actions$: Actions, private cardsService: CardsApiService, private store: Store<AppState>) {
  }

}
