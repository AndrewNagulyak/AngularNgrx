import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {SignInApiService} from './pages/authorization/sign-in/datasource/sign-in.api-service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import {AppService} from './app.service';
import {AppState} from './reducers';
import {select, Store} from '@ngrx/store';
import {isLoggedIn} from './pages/authorization/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu = false;
  url;
  sessionTimer: number;
  sessionTimerText: string;
  sessionTimerSub: Subscription;
  isLogged$;
  transparent = false;
  @ViewChild('session', {static: false}) sessionPopup: SwalComponent;

  constructor(
    public signInBase: SignInApiService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private store: Store<AppState>,
    private ngZone: NgZone,
    public readonly swalTargets: SwalPortalTargets
  ) {

  }

  public ngOnInit() {
    this.isLogged$ = this.store.pipe(select(isLoggedIn));
    this.router.events.subscribe((event) => {
      this.appService.heartbeat();
      if (event instanceof ActivationEnd && event.snapshot.children.length === 0) {
        if (event.snapshot.data.hasOwnProperty('fullView')) {
          const fullView = event.snapshot.data['fullView'];
          this.showMenu = !fullView;
          this.transparent = event.snapshot.data['transparent'];
        } else {
          this.showMenu = true;
          this.transparent = false;
        }
        if (event.snapshot.data.hasOwnProperty('transparent')) {
          this.transparent = event.snapshot.data['transparent'];
        } else {
          this.transparent = false;
        }
      }
    });


    if (!this.isLogged$) {
      this.router.navigate(['authorization']);
    }

    this.appService.openSessionPopup.subscribe(() => {
      this.showSessionPopup();
    });
  }

  showSessionPopup() {
    this.sessionTimer = 120000;
    this.sessionTimerText = '2:00';
    this.sessionTimerSub = interval(1000).subscribe(() => {
      this.sessionTimer -= 1000;
      this.sessionTimerText = Math.floor(this.sessionTimer / 60000) + ':' +
        ('0' + (this.sessionTimer % 60000) / 1000).slice(-2);
      if (this.sessionTimer <= 1000 && this.sessionTimerSub && !this.sessionTimerSub.closed) {
        this.sessionPopup.dismiss.next();
        this.appService.closeUserSession();
      }
    });

    this.sessionPopup.swalOptions = {
      title: 'Session',
      confirmButtonColor: '#42a3ed',
      confirmButtonText: 'Keep session',
      showConfirmButton: true,
      cancelButtonText: 'Logout',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    };
    this.sessionPopup.fire().then(result => {
      if (this.sessionTimerSub && !this.sessionTimerSub.closed) {
        this.sessionTimerSub.unsubscribe();
      }
      if (result.isConfirmed) {
        this.appService.keepSession();
      } else {
        this.appService.closeUserSession();
      }
    });
  }
}
