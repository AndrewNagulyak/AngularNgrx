import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import {BoardsActionTypes, GetBoardsAction, GetLastBoardsAction, PageChangeAction} from '../../store/boards.actions';
import {getLastBoards, selectAllBoardsPage} from '../../store/boards.selectors';
import {Observable} from 'rxjs';
import {BoardModel} from '../../../../shared/models/board.model';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {
  }

  lastBoards: Observable<BoardModel[]>;
  allBoards: Observable<BoardModel[]>;
  page = 1;
  pageLimit = 2;
  totalCount = 0;

  pageChange(page) {
    this.page = page;
    this.store.dispatch(new PageChangeAction({
        page: page
      }
    ));
  }

  ngOnInit(): void {
    this.lastBoards = this.store.pipe(select(getLastBoards), tap(boards => {
      if (!boards) {
        this.store.dispatch(new GetLastBoardsAction());
      }
    }), filter(board => !!board));
    this.allBoards = this.store.pipe(select(selectAllBoardsPage({
      page: this.page,
      limit: this.pageLimit
    })), tap(boards => {
      if (boards.totalCount === null && boards.action === BoardsActionTypes.PageChange
        || boards.action === BoardsActionTypes.GetLastBoards) {
        this.store.dispatch(new GetBoardsAction({
            page: {
              page: this.page,
              limit: this.pageLimit
            }
          }
        ));
      } else {
        this.totalCount = boards.totalCount;
      }
    }), map(boards => boards.results));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new PageChangeAction({page: 1}));
  }

}
