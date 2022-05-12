import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SignUpComponent} from './sign-up.component';
import {Logout, Register} from '../authorization.actions';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AppState} from '../../../reducers';


describe('SignUp', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;
  let store: MockStore<AppState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideMockStore()],
        imports: [FormsModule, ReactiveFormsModule,
          TranslateModule.forRoot()],
        declarations: [SignUpComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
    ).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {
    });

  });

  it('should dispatch logout on init', () => {

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new Logout(false))
  });

  it('should check form on validity', () => {

    const regForm = component.registerForm

    const regValue = {
      email: '',
      password: '',
      retype_password: '',
      name: '',
      surname: ''
    }
    regForm.patchValue(regValue);

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledTimes(0)


  })

  it('should check form on validity', () => {
    const regForm = component.registerForm

    const regValue = {
      email: 'test1@gmail.com',
      password: '12qwaszx',
      retype_password: '12qwaszx',
      name: 'afsh',
      surname: 'saf'
    };
    regForm.patchValue(regValue);

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(new Register({
      email: 'test1@gmail.com',
      password: '12qwaszx', displayName: 'afsh saf'
    }));


  })
});
