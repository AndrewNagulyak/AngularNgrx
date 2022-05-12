import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SwiperOptions} from 'swiper';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import Swiper from "swiper/types/swiper-class";

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);


@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  @ViewChild('swiperRef', {static: false}) swiperRef?: SwiperComponent;
  slides$ = new BehaviorSubject<any[]>(['']);
  slides = [
    {
      title: 'Main technologies',
      subtitle: 'Main technologies used in this project',
      points: ['Angular 13', 'NestJs', 'Postgres', 'Ionic']
    },
    {
      title: 'Authorization',
      subtitle: 'Role based authorisation block',
      points: ['JWT authorization', 'Google Authentication', 'Remember me', 'Forgot password', 'Different roles(Admin/User)']
    },
    {
      title: 'StateManagement',
      subtitle: 'NgRx Library for State management',
      points: ['NgRx Actions', 'NgRx Reducers', 'NgRx Effects', 'NgRx Selectors']
    },
    {
      title: 'Internationalization',
      subtitle: 'Using i18n for internationalise application',
      points: ['Languages :', 'English', 'Ukraine']
    },
    {
      title: 'WebSockets',
      points: ['Chatting', 'Group chats']
    }];

  config: SwiperOptions = {
    slidesPerView: 1,
    navigation: true,
    autoHeight: true,
    pagination: {clickable: true},
  };

  ngOnInit() {
    this.slides$.next(this.slides as any);
  }

}
