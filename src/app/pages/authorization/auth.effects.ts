import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthorizationActionTypes, Login, Logout} from './authorization.actions';
import {tap} from 'rxjs/operators';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {defer, of} from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthorizationActionTypes.LoginAction),
    tap(action => {
      this.appService.startHeartBeating();
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      localStorage.setItem('Authorization', `Bearer ${action.payload.data['accessToken']}`);
      this.router.navigate(['boards']);
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthorizationActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('Authorization');
      this.router.navigate(['authorization']).then();
      this.appService.stopHeartBeating();
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const auth = localStorage.getItem('Authorization').replace('Bearer ', '');

    if (userData && auth) {
      return of(new Login({data: {user: userData, accessToken: auth}}));
    } else {
      return of(new Logout());
    }
  });


  constructor(private actions$: Actions, private appService: AppService, private router: Router) {
  }

}
