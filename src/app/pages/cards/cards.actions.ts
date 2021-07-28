import {Action} from '@ngrx/store';
import {CardModel} from '../../shared/models/card.model';
import {Update} from '@ngrx/entity';
import {PaginationParams, PaginationWrapper} from '../../shared/models/pagination-wrapper';

export enum CardsActionTypes {
  RequestCardAction = '[View Card Page] Card Requested',
  LoadedCardAction = '[Card Api] Card Loaded',
  RequestAllCards = '[Cards Home Page] Cards Loaded',
  CancelledAllCards = '[Cards Home Page] Cards Cancelled',
  LoadAllCards = '[Card Api] Cards Loaded',
  CardSaved = '[Edit Course Dialog] Course Saved',
  CardPageAddedToCache = '[Card Page added to Cache]'
}

export interface PageQueary {
  pageIndex: number;
  pageSize: number;
}


export class RequestedCardByIdAction implements Action {
  readonly type = CardsActionTypes.RequestCardAction;

  constructor(public payload: { cardId: number }) {

  }
}

export class LoadedCardByIdAction implements Action {
  readonly type = CardsActionTypes.LoadedCardAction;

  constructor(public payload: { card: CardModel }) {

  }
}

export class RequestAllCardsAction implements Action {


  readonly type = CardsActionTypes.RequestAllCards;

  constructor(public payload: { page: PaginationParams }) {

  }

}


export class AddCardPageToCacheAction implements Action {

  readonly type = CardsActionTypes.CardPageAddedToCache;

  constructor(public payload: { page: PaginationParams }) {

  }

}

export class CancelledAllCardsAction implements Action {
  readonly type = CardsActionTypes.CancelledAllCards;
}

export class LoadedAllCardsAction implements Action {
  readonly type = CardsActionTypes.LoadAllCards;

  constructor(public payload: { cards: PaginationWrapper<CardModel>, page: PaginationParams }) {

  }
}

export class CardSavedAction implements Action {
  readonly type = CardsActionTypes.CardSaved;

  constructor(public payload: { card: Update<CardModel> }) {

  }
}

//
// export class LoadCardsAction implements Action {
//   readonly type = CardsActionTypes.LoadedCardsAction;
//
//   constructor(public payload: { cards: CardModel[] }) {
//
//   }
// }

export type CardsActions =
  RequestedCardByIdAction
  | LoadedCardByIdAction
  | RequestAllCardsAction
  | LoadedAllCardsAction
  | CardSavedAction
  | CancelledAllCardsAction
  | AddCardPageToCacheAction;
