import {Component, OnInit} from '@angular/core';
import {Logout} from '../../../../pages/authorization/authorization.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../reducers';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());

  }

}
