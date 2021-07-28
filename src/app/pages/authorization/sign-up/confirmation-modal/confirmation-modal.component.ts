import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignUpApiService } from '../datasource/sign-up.api-service';
import { SignInApiService } from '../../sign-in/datasource/sign-in.api-service';

export interface DialogData {
  parent_id: any;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SignUpApiService, SignInApiService]
})
export class ConfirmationModalComponent implements OnInit {

  public confirmationCode = '';
  public successCode = true;

  constructor(private signUpBase: SignUpApiService, private signInBase: SignInApiService,
              private router: Router,
              public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  public signUpFinish() {
    const params = {...this.data};
    params['code'] = parseFloat(this.confirmationCode);

    this.signUpBase.signUpFinalize(params).subscribe(result => {
      this.successCode = true;
      const logInParams = {
        role: 'doctor',
        appType: 'doctor',
        deviceId: '1',
        login: this.data['login'],
        password: this.data['password']
      };
      this.signInBase.logIn(logInParams).subscribe(res => {
        localStorage.setItem('Authorization', `Bearer ${res['data'].access}`);
        this.router.navigate([`account/users/${res['data'].profile.id}`]);
      });
    }, error => {
      this.successCode = false;
      alert(error.error.message);
    });
  }

  ngOnInit() {
  }

}
