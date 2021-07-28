import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryISO, SearchCountryField} from 'ngx-intl-tel-input';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SignUpApiService} from './datasource/sign-up.api-service';
import {countries} from './countries';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SignUpApiService]
})

export class SignUpComponent implements OnInit, OnDestroy {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  registerForm = new FormGroup({
    phone: new FormControl(null, [Validators.required]),
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    retype_password: new FormControl(null, [Validators.required]),
    privacy: new FormControl(false, [Validators.required]),
    remember: new FormControl(false),
  });

  public selectedSpecialization = null;
  public specializations = [];

  constructor(
    private router: Router,
    private signUpBase: SignUpApiService,
    public createDialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public openConfirmationDialog(data): void {
    const dialogRef = this.createDialog.open(ConfirmationModalComponent, {
      width: '380px',
      maxHeight: '',
      maxWidth: '',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert('Now you are registered. Log in please.');
      }
    });
  }

  public singUpInit() {
    let countryISOCode = '';
    countries.forEach(country => {
      if (country.dialCode === this.registerForm.controls.phone.value.dialCode) {
        countryISOCode = country.name;
      }
    });

    const telephone = this.registerForm.controls.phone.value.number.replace(/\s/g, '');
    const params = {
      username: `${this.registerForm.controls.phone.value.dialCode}${telephone}`,
      password: this.registerForm.controls.password.value
    };
    this.signUpBase.signUp(params).subscribe(result => {
    }, error => (alert(error.error.message)));
  }

  redirectToLogin() {
    this.router.navigate(['authorization/login']);
  }


}
