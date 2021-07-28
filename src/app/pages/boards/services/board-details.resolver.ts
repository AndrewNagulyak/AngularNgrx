// import {Injectable} from '@angular/core';
// import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
// import {select, Store} from '@ngrx/store';
// import {AppState} from '../../../reducers';
// import {Observable} from 'rxjs';
// import {filter, first, tap} from 'rxjs/operators';
// import {BoardModel} from '../../../shared/models/board.model';
// import {BoardsApiService} from '../../../core/api/boards-api.service';
// import {GetBoardAction} from '../store/boards.actions';
// import {getBoard} from '../store/boards.selectors';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BoardDetailsResolver implements Resolve<BoardModel> {
//
//   constructor(private boardApiService: BoardsApiService, private store: Store<AppState>) {
//   }
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoardModel> {
//     // const boardId = route.params['id'];
//     // return this.store.pipe(select(getBoard(+boardId)), tap(board => {
//     //   if (!board || board.cards === undefined) {
//     //     this.store.dispatch(new GetBoardAction(boardId));
//     //   }
//     // }), filter(board => !!board && !!board.cards), first());
//
//   }
// }
