import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BoardsState} from './boards.reducer';
import {BoardsActionTypes} from './boards.actions';
import {BoardModel} from '../../../shared/models/board.model';
import * as moment from 'moment';
import {PaginationParams} from '../../../shared/models/pagination-wrapper';

export const getBoardsState = createFeatureSelector<BoardsState>('boards');

export const getAllBoards = createSelector(getBoardsState, (state: BoardsState) => state);
export const getLastBoards = createSelector(getBoardsState,
  (state: BoardsState) => state.lastData ? state.lastData.slice(0, 4).sort(compareDates) : state.lastData);
export const currentPage = createSelector(getBoardsState, (state: BoardsState) => state.page);
export const getBoard = (boardId: number) =>
  createSelector(getBoardsState, state => state.data.filter((board) => board.id === boardId)[0]);
// export const isDeleted = createSelector(getBoardsState, (state: BoardsState) =>
//   state.action === BoardsActionTypes.DELETE_GAME && state.done && !state.error);
export const isCreated = createSelector(getBoardsState, (state: BoardsState) =>
  state.action === BoardsActionTypes.CreateBoard && state.done && !state.error);
// export const isUpdated = createSelector(getBoardsState, (state: BoardsState) =>
//   state.action === BoardsActionTypes.UPDATE_GAME && state.done && !state.error);

// export const getDeleteError = createSelector(getBoardsState, (state: BoardsState) => {
//   return state.action === BoardsActionTypes.DELETE_GAME
//     ? state.error
//     : null;
// });
export const getCreateError = createSelector(getBoardsState, (state: BoardsState) => {
  return state.action === BoardsActionTypes.CreateBoard
    ? state.error
    : null;
});
// export const getUpdateError = createSelector(getBoardsState, (state: BoardsState) => {
//   return state.action === BoardsActionTypes.UPDATE_GAME
//     ? state.error
//     : null;
// });
export const getBoardsError = createSelector(getBoardsState, (state: BoardsState) => {
  return state.action === BoardsActionTypes.GetBoards
    ? state.error
    : null;
});
export const getBoardError = createSelector(getBoardsState, (state: BoardsState) => {
  return state.action === BoardsActionTypes.GetBoard
    ? state.error
    : null;
});

export const selectAllBoardsPage = (page: PaginationParams) => createSelector(getAllBoards, boardState => {
  const findPage = boardState.page;
  const cachePages = boardState.cachePage;
  if (cachePages.includes(findPage)) {
    const start = (boardState.page - 1) * page.limit,
      end = start + page.limit;
    return {results: boardState.data.slice(start, end), totalCount: boardState.totalPage};
  } else {
    return {results: [], totalCount: null, action: boardState.action};
  }
});


function compareDates(a: BoardModel, b: BoardModel) {
  if (moment(a.viewedDate).diff(b.viewedDate)) {
    return -1;
  } else {
    return 1;
  }
}

