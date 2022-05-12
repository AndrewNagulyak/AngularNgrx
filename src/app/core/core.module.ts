import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { ProfileInfoComponent } from './ui/header/components/profile-info/profile-info.component';
import { AppRoutingModule } from '../app-routing.module';
import { SnackbarComponent } from './ui/snackbar/snackbar.component';
import { NhIconComponent } from './ui/nh-icon/nh-icon.component';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProfileInfoComponent, SnackbarComponent, NhIconComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        TranslateModule,
        HttpClientModule,
        RouterModule,
        IonicModule
    ],
  exports: [
    FooterComponent, HeaderComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
// one instance per application
