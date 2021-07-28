import {Injectable} from '@angular/core';
import {CardModel} from '../../../shared/models/card.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CardsApiService} from '../../../core/api/cards-api.service';
import {AppState} from '../../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCardById} from '../cards.selectors';
import {filter, first, tap} from 'rxjs/operators';
import {RequestedCardByIdAction} from '../cards.actions';

@Injectable()
export class CardsResolver implements Resolve<CardModel> {

  constructor(private cardsApiService: CardsApiService, private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardModel> {
    const cardId = route.params['id'];
    return this.store.pipe(select(selectCardById(cardId)), tap(card => {
      if (!card) {
        this.store.dispatch(new RequestedCardByIdAction({cardId}));
      }
    }), filter(card => !!card), first());
  }
}
