import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {isCreated} from '../../store/boards.selectors';
import {Observable} from 'rxjs';
import {BoardModel} from '../../../../shared/models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {

  @Input() boards: Observable<BoardModel[]>;
  @Input() title;
  @Input() hasPaginator = false;
  @Input() page = 1;
  @Input() pageLimit = 10;
  @Input() totalCount = 0;
  @Input() canCreate = false;
  @Output() pageChange = new EventEmitter();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(isCreated).subscribe(done => {
      this.closeClick();
    });
  }

  dispatchCreateDialog() {

  }

  closeClick() {
  }

  boardsPageChanges(page) {
    this.pageChange.emit(page);
  }

  save() {

  }

}
