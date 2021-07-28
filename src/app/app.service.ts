import {EventEmitter, Injectable} from '@angular/core';
import * as moment from 'moment';
import {interval, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SignInApiService} from './pages/authorization/sign-in/datasource/sign-in.api-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private lastOperationTime: number;

  openSessionPopup = new EventEmitter(true);
  heartbeatSub: Subscription;

  constructor(
    private router: Router,
    private singInBase: SignInApiService
  ) {
    this.heartbeat();
    if (localStorage.getItem('Authorization')) {
      this.startHeartBeating();
    }
  }

  startHeartBeating(): void {
    const lastHeartbeat = localStorage.getItem('last_heartbeat');
    if (lastHeartbeat) {
      this.lastOperationTime = parseInt(lastHeartbeat);
    }
    this.heartbeatSub = interval(30000).subscribe(() => {
      const currentMoment = moment().valueOf();
      if (currentMoment - this.lastOperationTime > 600000) {
        this.stopHeartBeating();
        this.openSessionPopup.emit();
      }
    });
  }

  stopHeartBeating() {
    if (this.heartbeatSub && !this.heartbeatSub.closed) {
      this.heartbeatSub.unsubscribe();
    }
  }

  keepSession() {
    this.heartbeat();
    this.startHeartBeating();
  }


  heartbeat() {
    this.lastOperationTime = moment().valueOf();
    localStorage.setItem('last_heartbeat', this.lastOperationTime.toString(10));
  }

  closeUserSession() {
    this.stopHeartBeating();
    this.singInBase.logOut().subscribe(res => {
      localStorage.removeItem('Authorization');
      this.router.navigate(['authorization']).then();
    });
  }
}
