import {AppGuard} from './app.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AppState} from '../../reducers';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {isLoggedIn} from '../../pages/authorization/auth.selectors';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

describe('Logged in guard should', () => {
  let guard: AppGuard;
  let store: MockStore<AppState>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let activatedRoute

  afterEach(() => {
    store?.resetSelectors();
  });
  // async beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({
        selectors: [{selector: isLoggedIn, value: true}]
      }),
        AppGuard
      ]
    }).compileComponents(); // compile template and css
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AppGuard);
    activatedRoute = TestBed.inject(ActivatedRoute)
  });

  it('should navigate if the user state is not logged in', () => {
    (guard.canActivate(activatedRoute, {} as any) as Observable<boolean>).subscribe((res)=>{
      expect(routerSpy).toHaveBeenCalledWith('/authorization/login')
    })
  });

});
