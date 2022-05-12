import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppState} from '../../reducers';
import {isLoggedIn, selectAuthState} from '../../pages/authorization/auth.selectors';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AppGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store.select(isLoggedIn).pipe(tap(isLogged => {
      if (!isLogged) {
        this.router.navigateByUrl('/authorization/login');
      }
    }));
  }
}

