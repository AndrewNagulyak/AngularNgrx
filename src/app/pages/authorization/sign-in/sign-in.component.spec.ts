import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {LogIn, LogInGoogleSuccess, Logout, Register} from '../authorization.actions';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AppState} from '../../../reducers';
import {SignInComponent} from './sign-in.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MockActivatedRoute} from '../../../shared/mocks/mock-activated-route';


describe('SignUp', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let component: SignInComponent;
  let store: MockStore<AppState>;
  let activatedRouteStub: MockActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideMockStore(), {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }],
        imports: [FormsModule, ReactiveFormsModule,
          TranslateModule.forRoot()],
        declarations: [SignInComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
    ).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {
    });

  });

  it('should dispatch logout on init', () => {

    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout(false))
  });

  it('should subscribe to route and catch params on init', () => {
    activatedRouteStub.testParams = {
      token: '1',
      displayName: '2',
      email: '3'
    };
    fixture.detectChanges();

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new LogInGoogleSuccess({token: '1', displayName: '2', email: '3'}))
  });

  it('should check form on validity', () => {

    const regForm = component.loginForm

    const regValue = {
      email: '',
      password: '',
    }
    regForm.patchValue(regValue);

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledTimes(0)


  })

  it('should check form on validity', () => {
    const regForm = component.loginForm

    const regValue = {
      email: 'test1@gmail.com',
      password: '12qwaszx',
      isSave: true
    };
    regForm.patchValue(regValue);

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(new LogIn({
      email: 'test1@gmail.com',
      password: '12qwaszx', displayName: 'afsh saf',
      isSave: true
    }));


  })
});
