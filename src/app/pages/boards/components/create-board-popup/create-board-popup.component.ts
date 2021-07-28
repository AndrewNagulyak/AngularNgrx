import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {CreateBoardAction} from '../../store/boards.actions';

@Component({
  selector: 'app-create-board-popup',
  templateUrl: './create-board-popup.component.html',
  styleUrls: ['./create-board-popup.component.scss']
})
export class CreateBoardPopupComponent implements OnInit {

  constructor(private storee: Store<AppState>) {
  }

  boardForm = new FormGroup({
    title: new FormControl('', Validators.required)
  });
  boardStyles = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1626033121423-c1a82ba72da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjI2NTM3MjE4&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1626126359831-8f6eb1841c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjI2NTM3MjE4&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1626169572088-5959632d71e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjI2NTM3MjE4&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1626288065740-ef37e7514e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjI2NTM3MjE4&ixlib=rb-1.2.1&q=80&w=400'
    },
    {
      type: 'color',
      url: 'rgb(0, 121, 191)'
    },
    {
      type: 'color',
      url: 'rgb(210, 144, 52)'
    },
    {
      type: 'color',
      url: 'rgb(81, 152, 57)'
    },
    {
      type: 'color',
      url: 'rgb(176, 70, 50)'
    },
  ];
  boardStyle = this.boardStyles[0];

  @Output('close')
  closeEmitter = new EventEmitter<Object>();

  ngOnInit(): void {
  }

  save() {
    const el = {
      ...this.boardForm.value
    };
    if (this.boardStyle.type === 'image') {
      el.imgUrl = this.boardStyle.url;
    } else {
      el.color = this.boardStyle.url;
    }
    this.storee.dispatch(new CreateBoardAction(el));
  }

  closeCard() {
    this.closeEmitter.emit();
  }

  setBoardStyle(index) {
    this.boardStyle = this.boardStyles[index];
  }

}
