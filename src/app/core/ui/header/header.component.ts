import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectUser} from '../../../pages/authorization/auth.selectors';
import {ProfileGet} from '../../../pages/authorization/authorization.actions';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  cols = [
    {
      name: 'home',
      bage: 0,
      route: '/home'.split('/')
    },
    {
      name: 'people',
      bage: 0,
      route: '/people'.split('/')
    }, {
      name: 'briefcase',
      bage: 3,
      route: '/posts'.split('/')
    },
    {
      name: 'chatbox-ellipses',
      bage: 0,
      route: '/chatting'.split('/')
    },
    {
      name: 'notifications',
      bage: 2,
      route: '/notifications'.split('/')
    }]
  $user;
  @Input() transparent;

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new ProfileGet());
    this.$user = this.store.select(selectUser)
  }

   async openDialog(ev) {
    const popover = await this.popoverController.create({
      component: ProfileInfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      showBackdrop: false,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
