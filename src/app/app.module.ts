import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppGuard} from './core/guards/app.guard';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './shared/models/custom-route-serializer';
import {EffectsModule} from '@ngrx/effects';
import {AppHttpInterceptor} from './core/interceptors/app-http.interceptor';
import {RouterModule} from '@angular/router';
import {AuthEffects} from './pages/authorization/auth.effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import {SocketIoModule} from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreDevtoolsModule.instrument(),
    CoreModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    BrowserAnimationsModule,
    RouterModule,
    IonicModule.forRoot(),
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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}
