import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../reducers';
import {Logout, ProfileGet, ProfileGetSuccess} from '../../../../../pages/authorization/authorization.actions';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() user;

  constructor(private store: Store<AppState>, private popoverController: PopoverController) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());
    this.popoverController.dismiss();
  }

  changeLanguage() {
  }
}
