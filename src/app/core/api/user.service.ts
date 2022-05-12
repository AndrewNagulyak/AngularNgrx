import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpWrapper, HttpWrapperArray} from '../../shared/models/http-wrapper';
import {UserModel} from '../../shared/models/user.model';
import {ApiConst} from '../../shared/enums/environment.enum';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {selectUser} from '../../pages/authorization/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) {
    this.store.select(selectUser).subscribe(stateUser => {
      this.user = stateUser;
    })
  }

  getProfile() {
    const authToken = localStorage.getItem('Authorization')
    const headers = new HttpHeaders().set('Authorization', authToken ? 'Bearer ' + authToken : 'Barer' + this.user.token);
    return this.http.get<UserModel>(
      `${ApiConst.baseUrl}/auth/getProfile`, {headers});
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));

    return this.http.get<UserModel[]>(
      `${ApiConst.baseUrl}/auth/contacts`, {headers});
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${ApiConst.baseUrl}/auth/signin`;
    return this.http.post<UserModel>(url, {email, password});
  }

  logInGoogle() {
    const url = `${ApiConst.baseUrl}/auth/signup`;
    window.location.href = 'http://localhost:3000/auth/google';

  }

  signUp(body): Observable<UserModel> {
    const url = `${ApiConst.baseUrl}/auth/signup`;
    return this.http.post<UserModel>(url, body);
  }


}
