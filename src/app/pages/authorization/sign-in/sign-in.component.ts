import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {LogIn, LogInGoogle, LogInGoogleSuccess, Logout} from '../authorization.actions';
import {selectAuthState} from '../auth.selectors';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  getState: Observable<any>;
  isSent = false;
  errorMessage: string | null;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
    this.getState = this.store.select(selectAuthState);
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    isSave: new FormControl(true),
    password: new FormControl(null, [Validators.required])
  });

  onSubmit() {
    this.isSent = true;
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
        isSave: this.loginForm.controls.isSave.value
      };
      this.store.dispatch(new LogIn(payload));
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new Logout(false));
    this.activatedRoute.queryParams.subscribe((param) => {
      console.log(param);
      if (param.success) {
        this.store.dispatch(new LogInGoogleSuccess({
          token: param.token,
          displayName: param.displayName,
          email: param.email
        }))
      }
    })
    this.getState.subscribe((state) => {
      this.errorMessage = state ? state.errorMessage : '';
    });
  }

  googleAuth() {
    this.store.dispatch(new LogInGoogle());
  }
}
