import {Action} from '@ngrx/store';
import {BoardModel} from '../../../shared/models/board.model';
import {PaginationParams, PaginationWrapper} from '../../../shared/models/pagination-wrapper';
import {CardModel} from '../../../shared/models/card.model';
import {Update} from '@ngrx/entity';
import {TaskModel} from '../../../shared/models/task.model';

export enum BoardsActionTypes {
  CreateBoard = '[Boards] Create Board',
  CreateBoardSuccess = '[Boards] Create Board Success',
  CreateBoardError = '[Boards] Create Board Error',

  GetBoards = '[Boards] Get Boards',
  GetBoardsSuccess = '[Boards] Get Boards Success',
  GetBoardsError = '[Boards] Get Boards Error',
  PageChange = '[Boards] Get PageChanged',

  GetLastBoards = '[Boards] Get LAST Boards',
  GetLastBoardsSuccess = '[Boards] Get LAST Boards Success',
  GetLastBoardsError = '[Boards] Get LAST Boards Error',

  GetBoard = '[Boards] Get Board by Id',
  GetBoardSuccess = '[Boards] Get Board by Id Success',
  GetBoardError = '[Boards] Get Board by Id Error',


  CreateCard = '[Boards] Create Card',
  CreateCardSuccess = '[Boards] Create Card Success',

  UpdateCard = '[Boards] Update Card',
  UpdateCardSuccess = '[Boards] Update Card Success',

  CreateTask = '[Boards] Create Task',
  CreateTaskSuccess = '[Boards] Create Task Success',

}

// Get Last

export class GetLastBoardsAction implements Action {
  readonly type = BoardsActionTypes.GetLastBoards;
}


export class GetLastBoardsSuccessAction implements Action {
  readonly type = BoardsActionTypes.GetLastBoardsSuccess;

  constructor(public payload: BoardModel[]) {
  }
}

export class GetLastBoardsErrorAction implements Action {
  readonly type = BoardsActionTypes.GetLastBoardsError;

  constructor(public payload: Error) {
  }
}

// Get All

export class PageChangeAction implements Action {
  readonly type = BoardsActionTypes.PageChange;

  constructor(public payload: { page: number }) {
  }
}

export class GetBoardsAction implements Action {
  readonly type = BoardsActionTypes.GetBoards;

  constructor(public payload: { page: PaginationParams }) {
  }
}

export class GetBoardsSuccessAction implements Action {
  readonly type = BoardsActionTypes.GetBoardsSuccess;

  constructor(public payload: { boards: PaginationWrapper<BoardModel>, page: PaginationParams }) {
  }
}

export class GetBoardsErrorAction implements Action {
  readonly type = BoardsActionTypes.GetBoardsError;

  constructor(public payload: Error) {
  }
}

// Get By Id
export class GetBoardAction implements Action {
  readonly type = BoardsActionTypes.GetBoard;

  constructor(public payload: number) {
  }
}

export class GetBoardSuccessAction implements Action {
  readonly type = BoardsActionTypes.GetBoardSuccess;

  constructor(public payload: BoardModel) {
  }
}

export class GetBoardErrorAction implements Action {
  readonly type = BoardsActionTypes.GetBoardError;

  constructor(public payload: Error) {
  }
}


// Create
export class CreateBoardAction implements Action {
  readonly type = BoardsActionTypes.CreateBoard;

  constructor(public payload: BoardModel) {

  }
}

export class CreateBoardSuccessAction implements Action {
  readonly type = BoardsActionTypes.CreateBoardSuccess;

  constructor(public payload: BoardModel) {

  }
}

export class CreateCardAction implements Action {
  readonly type = BoardsActionTypes.CreateCard;

  constructor(public payload: CardModel) {

  }
}

export class CreateCardSuccessAction implements Action {
  readonly type = BoardsActionTypes.CreateCardSuccess;

  constructor(public payload: CardModel) {

  }
}

export class UpdateCardAction implements Action {
  readonly type = BoardsActionTypes.UpdateCard;

  constructor(public payload: Update<CardModel>) {
  }
}

export class UpdateCardSuccessAction implements Action {
  readonly type = BoardsActionTypes.UpdateCardSuccess;

  constructor(public payload: CardModel) {

  }
}

export class CreateBoardErrorAction implements Action {
  readonly type = BoardsActionTypes.CreateBoardError;

  constructor(public payload: Error) {
  }
}


export class CreateTaskAction implements Action {
  readonly type = BoardsActionTypes.CreateTask;

  constructor(public payload: TaskModel, public borderId: number) {

  }
}

export class CreateTaskSuccessAction implements Action {
  readonly type = BoardsActionTypes.CreateTaskSuccess;

  constructor(public payload: TaskModel) {

  }
}

export type BoardsActions = GetBoardAction | GetBoardSuccessAction | GetBoardErrorAction
  | GetBoardsAction | GetBoardsErrorAction | GetBoardsSuccessAction | PageChangeAction
  | GetLastBoardsAction | GetLastBoardsErrorAction | GetLastBoardsSuccessAction
  | CreateBoardAction | CreateBoardSuccessAction | CreateBoardErrorAction | CreateTaskAction | CreateTaskSuccessAction
  | CreateCardAction | CreateCardSuccessAction | UpdateCardAction | UpdateCardSuccessAction;
