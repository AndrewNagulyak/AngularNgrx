import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router, RouterModule} from '@angular/router';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AppState} from '../../reducers';
import {ApiConst} from '../../shared/enums/environment.enum';
import {RouterTestingModule} from '@angular/router/testing';

let httpMock: HttpTestingController;

const mockNewUser = {
  name: 'test',
  surname: 'user',
  email: 'test1@gmail.com',
  password: 'password'
}

let fixture: ComponentFixture<UserService>;
let service: UserService;
let store: MockStore<AppState>;

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideMockStore()],
        imports: [HttpClientTestingModule, RouterTestingModule],
      },
    );
    store = TestBed.inject(MockStore);
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController)

  });

  afterEach(() => {
    httpMock.verify();
  })

  describe('getUserById', () => {
    it('should retrive user from API via Get request', () => {
      const dummyUser = {
        email: 'test1@gmail.com',
        displayName: 'test user'
      }
      localStorage.setItem('Authorization', 'test')

      service.getProfile()

      service.getProfile().subscribe(user => {
        expect(user).toEqual(dummyUser);
      });
      const req = httpMock.expectOne(`${ApiConst.baseUrl}/auth/getProfile`)
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer test')
      req.flush(dummyUser);
    })
  })

  describe('signUp', () => {
    it('should send user to API', () => {
      const dummyUser = {
        email: 'test1@gmail.com',
        password: 'testpass',
        displayName: 'test user'
      }

      service.signUp(dummyUser).subscribe();

      const req = httpMock.expectOne(`${ApiConst.baseUrl}/auth/signup`)
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(dummyUser);
      req.flush({});
    })
  })


});
