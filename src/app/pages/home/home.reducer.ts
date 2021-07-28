import {Action, State} from '@ngrx/store';
import {CardModel} from '../../shared/models/card.model';
import {AuthorizationActionTypes} from '../authorization/authorization.actions';
import {CardsActionTypes} from '../cards/cards.actions';


export const authFeatureKey = 'cards';

export interface CardsState {
  cards: CardModel[];

}

export const initialState: CardsState = {
  cards: []
};


export function cardsReducer(state = initialState, action): CardsState {
  switch (action.type) {
    case  CardsActionTypes.InitCardsAction:
      return {
        cards: action.payload
      };
    default:
      return state;
  }
}
