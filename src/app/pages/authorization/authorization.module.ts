import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ConfirmationModalComponent } from './sign-up/confirmation-modal/confirmation-modal.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InlineSVGModule} from 'ng-inline-svg';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgxIntlTelInputModule,
    MatCheckboxModule,
    InlineSVGModule,
    MatDialogModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ConfirmationModalComponent
  ],
  entryComponents: [ConfirmationModalComponent],
  providers: [],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthorizationModule {

}
