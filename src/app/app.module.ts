import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppGuard} from './core/guards/app.guard';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './shared/models/custom-route-serializer';
import {EffectsModule} from '@ngrx/effects';
import {AuthorizationModule} from './pages/authorization/authorization.module';
import Swal from 'sweetalert2';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AppHttpInterceptor} from './core/interceptors/app-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBl3ZhyDX058Uu-Cx99khGsiOZAFwIExxE',
      authDomain: 'nh-tea.firebaseapp.com',
      projectId: 'nh-tea',
      storageBucket: 'nh-tea.appspot.com',
      messagingSenderId: '754052414996',
      appId: '1:754052414996:web:082d807aa5f007df887101',
      measurementId: 'G-2LET3R700N'
    }),
    SweetAlert2Module.forRoot({
      provideSwal: Swal.mixin({
        heightAuto: false,
        showClass: {
          popup: 'animated zoomInSmall fastest'
        },
        hideClass: {
          popup: 'animated zoomOut fastest'
        },
        reverseButtons: true,
        customClass: {
          confirmButton: 'confirm-popup-button',
          cancelButton: 'cancel-popup-button',
          title: 'popup-title',
        }
      })
    }),
    AuthorizationModule
  ],
  providers: [AppGuard, {provide: RouterStateSerializer, useClass: CustomSerializer},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
