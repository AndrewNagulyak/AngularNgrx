import {UserService} from '../api/user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppHttpInterceptor} from './app-http.interceptor';
import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiConst} from '../../shared/enums/environment.enum';
import {throwError} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';

describe('HttpInterceptorService', () => {
  let httpService: UserService;
  let httpMock: HttpTestingController;
  let interceptor: AppHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        UserService,
        provideMockStore(),
        {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
      ]
    });
    httpService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AppHttpInterceptor);
  });

  it('should console log snackbar on exception', () => {
    const error = new ProgressEvent('Authorisation error');

    httpService.getUsers().subscribe(() => {
      expect( spyOn(console,'log')).toHaveBeenCalledWith('this is server side error');
    })


    const req = httpMock.expectOne(`${ApiConst.baseUrl}/auth/contacts`)

    req.error(error);

  });


});
