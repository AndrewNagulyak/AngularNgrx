import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpWrapper, HttpWrapperArray} from '../../shared/models/http-wrapper';
import {UserModel} from '../../shared/models/user.model';
import {ApiConst} from '../../shared/enums/environment.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: HttpClient) {
  }

  //
  getUserById(userId: string) {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.api.get<HttpWrapper<UserModel>>(`${ApiConst.baseUrl}/auth/`, {headers});
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));

    return this.api.get<UserModel[]>(
      `${ApiConst.baseUrl}/auth/contacts`, {headers});
  }


}
