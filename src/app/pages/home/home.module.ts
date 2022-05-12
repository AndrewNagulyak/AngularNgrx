import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {IonicModule} from '@ionic/angular';
import {SwiperComponent} from './components/swiper/swiper.component';
import {SwiperModule} from 'swiper/angular';



@NgModule({
  declarations: [HomeComponent, SwiperComponent],
  imports: [
    SwiperModule,
    CommonModule,
    HomeRoutingModule,
    IonicModule
  ]
})
export class HomeModule { }
