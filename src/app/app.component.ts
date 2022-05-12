import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from './reducers';
import {select, Store} from '@ngrx/store';
import {isLoggedIn} from './pages/authorization/auth.selectors';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged$;
  count = 0;
  constructor(private router: Router, private store: Store<AppState>, private translateService: TranslateService) {

  }

  click() {
  }

  public ngOnInit() {
    this.isLogged$ = this.store.pipe(select(isLoggedIn));
    this.translateService.setDefaultLang('en');

  }
}
