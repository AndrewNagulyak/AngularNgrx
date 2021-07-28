import {CardModel} from '../../shared/models/card.model';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CardsActions, CardsActionTypes} from './cards.actions';

export const authFeatureKey = 'cards';

export interface CardsState extends EntityState<CardModel> {

  totalPage: number;
  cachePage: number[];

}


export const adapter: EntityAdapter<CardModel>
  = createEntityAdapter<CardModel>();

export const initialCardState: CardsState = adapter.getInitialState({
  totalPage: 0,
  cachePage: []
});


export function cardsReducer(state = initialCardState, action: CardsActions) {
  switch (action.type) {
    case CardsActionTypes.LoadedCardAction : {
      return adapter.addOne(action.payload.card, state);
    }
    case CardsActionTypes.LoadAllCards : {
      const cachePage = [...state.cachePage];
      cachePage.push(action.payload.page.page);

      return adapter.addMany(action.payload.cards.results, {
        ...state,
        totalPage: action.payload.cards.total,
        cachePage: cachePage
      });
    }
    case CardsActionTypes.CardSaved : {
      return adapter.updateOne(action.payload.card, state);
    }
    case CardsActionTypes.CardPageAddedToCache : {
      const cachePage = [...state.cachePage];
      cachePage.push(action.payload.page.page);
      return {...state, cachePage};
    }
    default : {
      return state;
    }
  }
}

export const {selectAll} = adapter.getSelectors();
