import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoardModel} from '../../../../shared/models/board.model';
import {AppState} from '../../../../reducers';
import {select, Store} from '@ngrx/store';
import {CreateCardAction, CreateTaskAction, GetBoardAction, UpdateCardAction} from '../../store/boards.actions';
import {getBoard} from '../../store/boards.selectors';
import {filter, shareReplay, tap} from 'rxjs/operators';
import {fromEvent, Observable} from 'rxjs';
import {CardModel} from '../../../../shared/models/card.model';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  boardId;
  board: Observable<BoardModel>;
  isAddMode = false;
  cardTitle = '';
  taskTitle = '';
  selectedCardIndex = -1;
  isEditMode = false;
  $click = fromEvent(document, 'click');

  ngOnInit(): void {
    this.$click.subscribe(() => {
      this.isEditMode = false;
      this.isAddMode = false;
    });
    this.boardId = this.activatedRoute.snapshot.params['id'];
    this.board = this.store.pipe(select(getBoard(+this.boardId)), tap(board => {
      if (!board || board.cards === undefined) {
        this.store.dispatch(new GetBoardAction(+this.boardId));
      }
    }), filter(board => !!board && !!board.cards), shareReplay());
    // this.activatedRoute.data.subscribe((data: { board: BoardModel }) => {
    //   this.board = data.board;
    //   // this.board = data.board.id;
    //   // this.cardForm = new FormGroup({
    //   //   title: new FormControl(data.card.title)
    //   // });
    //
    // });
  }

  stopProp(e) {
    e.stopImmediatePropagation();
  }

  changeTaskMode(i, e) {
    this.isEditMode = true;
    this.stopProp(e);
    this.selectedCardIndex = i;
  }

  changeMode(e) {
    this.stopProp(e);
    this.isAddMode = true;
  }

  focusOutFunction(card, value) {
    if (card.title !== value) {
      const updatedCard: Update<CardModel> = {id: card.id, changes: {title: value}};
      this.store.dispatch(new UpdateCardAction(updatedCard));
    }
  }

  editCard(index, e) {
    this.stopProp(e);
    this.selectedCardIndex = index;
    this.isEditMode = true;
  }

  addNewCard(e) {
    this.stopProp(e);
    if (this.cardTitle) {
      this.store.dispatch(new CreateCardAction({title: this.cardTitle, boardId: +this.boardId}));
      this.isAddMode = false;
      this.cardTitle = '';
    }

  }

  addNewTask(e) {
    this.stopProp(e);
    if (this.taskTitle) {
      this.store.dispatch(new CreateTaskAction({
        title: this.taskTitle,
        description: '',
        cardId: +this.selectedCardIndex
      }, +this.boardId));
      this.isEditMode = false;
      this.taskTitle = '';
    }
  }
}
