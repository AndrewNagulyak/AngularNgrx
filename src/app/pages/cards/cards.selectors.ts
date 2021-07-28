import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCards from './cards.reducer';
import {CardsState} from './cards.reducer';
import {PaginationParams} from '../../shared/models/pagination-wrapper';

export const selectCardsState = createFeatureSelector<CardsState>('cards');

export const selectCardById = (cardId: number) => createSelector(selectCardsState, cardsState => cardsState.entities[cardId]);
const pageChaches = [];
export const selectAllCards = createSelector(selectCardsState, cardsState => {
  return {state: cardsState, cards: fromCards.selectAll};
});

//   createSelector(selectCardsState, {
//   cards: fromCards.selectAll,
//   state: cardsState => cardsState.total
// });
export const selectAllCardsPage = (page: PaginationParams) => createSelector(selectAllCards, cardsState => {
  const findPage = page.page;
  const cachePages = cardsState.state.cachePage;
  if (cachePages.includes(findPage)) {
    const start = (page.page - 1) * page.limit,
      end = start + page.limit;
    return {results: cardsState.cards(cardsState.state).slice(start, end), totalCount: cardsState.state.totalPage};
  } else {
    return {results: [], totalCount: null};
  }
});
