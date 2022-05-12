import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  entryComponents: [],
  providers: [],
  exports: [
  ]
})
export class AuthorizationModule {

}
