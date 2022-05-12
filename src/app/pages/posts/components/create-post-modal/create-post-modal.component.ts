import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';
import {selectUser} from '../../../authorization/auth.selectors';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  @Input() postId?: number;

  $user;

  constructor(
    public store: Store<AppState>,
    public modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.$user = this.store.select(selectUser)
  }

  onDismiss() {
    this.modalController.dismiss(null, 'dismiss');
  }

  onPost() {
    if (!this.form.valid) return;
    const body = this.form.value['body'];
    this.modalController.dismiss(
      {
        post: {
          body,
        },
      },
      'post'
    );
  }

  ngOnDestroy() {
  }
}
