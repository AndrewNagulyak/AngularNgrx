import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryISO, SearchCountryField} from 'ngx-intl-tel-input';
import {Router} from '@angular/router';
import {SignInApiService} from './datasource/sign-in.api-service';
import {AppService} from '../../../app.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Login} from '../authorization.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SignInApiService]
})
export class SignInComponent implements OnInit, OnDestroy {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Ukraine];
  phoneForm = new FormGroup({
    phone: new FormControl('680801313', [Validators.required]),
    password: new FormControl('Hsdyt5858', [Validators.required])
  });

  constructor(
    private signInBase: SignInApiService,
    private router: Router,
    private store: Store<AppState>,
    private appService: AppService,
  ) {
  }

  ngOnInit(): void {
    console.log('auth');
  }

  ngOnDestroy(): void {
  }

  logIn(form) {
    const params = {
      username: `${form.phone.value.internationalNumber.replace(/\s+/g, '')}`,
      password: form.password.value
    };
    this.signInBase.logIn(params).subscribe(data => {
      this.store.dispatch(new Login({data}));
    }, error => {
    });
  }

  // notifyMe() {
  //   this.notificationService.notify('Notification granted');
  // }

  goToSignUp() {
    this.router.navigate(['authorization/register']);
  }

}
