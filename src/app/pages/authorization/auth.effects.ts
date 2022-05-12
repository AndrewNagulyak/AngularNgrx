import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure, LogInGoogle,
  LogInSuccess, LogoutSuccess, ProfileGetFailure, ProfileGetSuccess,
  RegisterFailure,
  RegisterSuccess
} from './authorization.actions';
import {UserService} from '../../core/api/user.service';
import {SnackbarService} from '../../core/ui/services/snackbar.service';


@Injectable()
export class AuthEffects {

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          console.log(user);
          return new LogInSuccess({token: user.accessToken, username: user.user.displayName, isSave: payload.isSave});
        }),
        catchError
        ((error) => {
          console.log(error);
          return of(new LogInFailure({error: error}));
        }),)
    }));


  @Effect()
  GetProfile: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_PROFILE),
    switchMap(payload => {
      return this.authService.getProfile().pipe(
        map((userInfo) => {
          return new ProfileGetSuccess(userInfo);
        }),
        catchError
        ((error) => {
          console.log(error);
          return of(new ProfileGetFailure({error: error}));
        }),)
    }));


  @Effect({dispatch: false})
  LogInGoogle: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_GOOGLE),
    map((action: LogInGoogle) => {
      this.authService.logInGoogle()
    }));


  @Effect({dispatch: false})
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE), tap(() => {
      this.snackBarService.openErrorSnackBar('Credentials error');
    })
  );
  @Effect({dispatch: false})
  ProfileGetFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_PROFILE_FAILURE), tap(() => {
      this.snackBarService.openErrorSnackBar('Error', 6000, true);
    })
  );

  @Effect({dispatch: false})
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS), map((user: any) => {
      if (user.payload.isSave) {
        localStorage.setItem('Authorization', user.payload.token);
      }
      this.router.navigateByUrl('/home');
    })
  );
  @Effect({dispatch: false})
  LogInGoogleSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_GOOGLE_SUCCESS), map((user: any) => {
      localStorage.setItem('Authorization', user.payload.token);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect()
  Registration: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        catchError
        ((error) => {
          console.log(error);
          return of();

        }),
        map((user) => {
          console.log(user);
          return new RegisterSuccess();
        }))
    }));


  @Effect({dispatch: false})
  RegisterFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_FAILURE)
  );


  @Effect({dispatch: false})
  RegisterSuccessed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS), map(() => {
      this.router.navigate(['authorization/login']);
      return of();
    })
  );


  @Effect({dispatch: false})
  LogoutSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS), map((redirect: any) => {
      if (redirect.payload.payload) {
        this.router.navigate(['authorization/login']);
      }
    })
  );

  @Effect()
  LogOut: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap((payload) => {
      localStorage.removeItem('Authorization');
      return of(new LogoutSuccess(payload));
    }));

  @Effect({dispatch: false})
  LogOutFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT_FAILURE)
  );

  constructor(private actions$: Actions, private authService: UserService, private router: Router, private snackBarService: SnackbarService) {
  }

}
