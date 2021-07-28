import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  BoardsActionTypes,
  CreateBoardAction,
  CreateBoardErrorAction,
  CreateBoardSuccessAction,
  CreateCardAction,
  CreateCardSuccessAction, CreateTaskAction, CreateTaskSuccessAction,
  GetBoardAction,
  GetBoardErrorAction,
  GetBoardsAction,
  GetBoardsErrorAction,
  GetBoardsSuccessAction,
  GetBoardSuccessAction,
  GetLastBoardsSuccessAction,
  UpdateCardAction,
  UpdateCardSuccessAction
} from './boards.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {BoardsApiService} from '../../../core/api/boards-api.service';
import {CardsApiService} from '../../../core/api/cards-api.service';
import {TasksApiService} from '../../../core/api/tasks-api.service';


@Injectable()
export class BoardsEffects {


  constructor(private actions$: Actions, private boardsService: BoardsApiService, private taskService: TasksApiService,
              private cardService: CardsApiService) {
  }

  @Effect()
  getAllBoards$: Observable<Action> = this.actions$.pipe(
    ofType<GetBoardsAction>(BoardsActionTypes.GetBoards),
    mergeMap(action => this.boardsService.getAll(action.payload.page).pipe(map((boards => {
      return {boards: boards, page: action.payload.page};
    })))),
    map(boards => new GetBoardsSuccessAction(boards)),
    catchError((err) => [new GetBoardsErrorAction(err)])
  );

  @Effect()
  getBoard$ = this.actions$.pipe(
    ofType(BoardsActionTypes.GetBoard),
    map((action: GetBoardAction) => action.payload),
    switchMap(id => this.boardsService.getById(id)),
    map(board => new GetBoardSuccessAction(board)),
    catchError((err) => [new GetBoardErrorAction(err)])
  );

  @Effect()
  getLastBoards$: Observable<Action> = this.actions$.pipe(
    ofType(BoardsActionTypes.GetLastBoards),
    switchMap(() => this.boardsService.getLast()),
    map(boards => new GetLastBoardsSuccessAction(boards)),
    catchError((err) => [new GetBoardsErrorAction(err)])
  );


  @Effect()
  createBoard$ = this.actions$.pipe(
    ofType(BoardsActionTypes.CreateBoard),
    map((action: CreateBoardAction) => action.payload),
    switchMap(newBoard => this.boardsService.createBoard(newBoard)),
    map((response) => new CreateBoardSuccessAction(response)),
    catchError((err) => [new CreateBoardErrorAction(err)])
  );

  @Effect()
  createCard$ = this.actions$.pipe(
    ofType(BoardsActionTypes.CreateCard),
    map((action: CreateCardAction) => action.payload),
    switchMap(newBoard => this.cardService.createCard(newBoard)),
    map((response) => new CreateCardSuccessAction(response)),
  );

  @Effect()
  createTask$ = this.actions$.pipe(
    ofType(BoardsActionTypes.CreateTask),
    map((action: CreateTaskAction) => action.payload),
    switchMap(newBoard => this.taskService.createTask(newBoard)),
    map((response) => new CreateTaskSuccessAction(response)),
  );
  @Effect()
  updateCard$ = this.actions$.pipe(
    ofType(BoardsActionTypes.UpdateCard),
    map((action: UpdateCardAction) => action.payload),
    switchMap(updateCardEntity => this.cardService.updateCard(updateCardEntity.id, {...updateCardEntity.changes})),
    map((response) => new UpdateCardSuccessAction(response)),
  );


}
