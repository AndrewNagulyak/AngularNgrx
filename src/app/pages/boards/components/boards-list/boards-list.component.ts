import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
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
  @ViewChild('addBoard', {static: true}) createBoardModal: SwalComponent;
  @Output() pageChange = new EventEmitter();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(isCreated).subscribe(done => {
      this.closeClick();
    });
  }

  dispatchCreateDialog() {
    this.createBoardModal.swalOptions = {
      showConfirmButton: false,
      showCancelButton: false,
      position: 'top',
      padding: 0,
      // customClass: { content: 'content-license-modal' },
      allowOutsideClick: true,
      allowEscapeKey: true,
    };
    this.createBoardModal.fire().then(result => {
      console.log(result);
      if (result.value) {
        // if (this.buttons.findIndex(element => element.id == result.value.id) === -1) {
        //   this.buttons.push(result.value);
        // }
      }
    });
  }

  closeClick() {
    this.createBoardModal.close();
  }

  boardsPageChanges(page) {
    this.pageChange.emit(page);
  }

  save() {

  }

}
