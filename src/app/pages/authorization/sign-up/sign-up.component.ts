import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LogIn, Logout, Register} from '../authorization.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Observable} from 'rxjs';
import {selectAuthState} from '../auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit, OnDestroy {

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(6)]),
    retype_password: new FormControl(null, [Validators.required, Validators.min(6)]),
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required])
  }, {validators: this.passwordConfirming});
  isClicked = false;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }


  ngOnDestroy(): void {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c && c.get('password').value !== c.get('retype_password').value) {
      return {invalid: true};
    }
  }

  ngOnInit(): void {
    this.store.dispatch(new Logout(false));
    this.getState.subscribe((state) => {
      this.errorMessage = state ? state.errorMessage : '';
    });
  }

  public onSubmit() {
    this.isClicked = true;
    if (this.registerForm.valid) {
      const payload = {
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
        displayName: this.registerForm.controls.name.value + ' ' + this.registerForm.controls.surname.value
      };
      this.store.dispatch(new Register(payload));
    }
  }


}
