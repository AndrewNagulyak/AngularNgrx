import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { ProfileInfoComponent } from './header/components/profile-info/profile-info.component';
@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProfileInfoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
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
//one instance per application
