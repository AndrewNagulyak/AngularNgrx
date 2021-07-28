import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiConst} from '../../../../shared/enums/environment.enum';
import {Observable} from 'rxjs';
import {ApiRoutes} from '../../../../shared/enums/api-routes.enum';


@Injectable({providedIn: 'root'})
export class SignInApiService {

  constructor(
    private api: HttpClient
  ) {
  }


  public logIn(params): Observable<any> {
    return this.api.post(`${ApiConst.baseUrl}${ApiRoutes.logIn}`, params);
  }

  public logOut(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.api.post(`${ApiConst.baseUrl}${ApiRoutes.logOut}`, {}, {headers});
  }

  public getLogIn(): boolean {
    return (localStorage.getItem('Authorization') !== null);
  }

  public getUserProfile(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
    return this.api.get(`${ApiConst.baseUrl}/${ApiRoutes.profile}`, {headers});
  }

  //
  // public updateUserProfile(params) {
  //   const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  //   return this.api.patch(`${ApiConst.baseUrl}/api/v3/profile`, params, {headers});
  // }

  // public changePass(pass: string) {
  //   const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  //   const options = {password: pass};
  //   return this.api.patch(`${ApiConst.baseUrl}/api/v3/profile/password`, options
  //     , {headers});
  // }

  // public recoveryQuestion(questionId: number, answer: string) {
  //   const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  //   const options = {questionId: questionId, answer: answer};
  //   return this.api.post(`${ApiConst.baseUrl}/api/v3/profile/recovery_question`, options
  //     , {headers});
  // }

  // public getRecoveryQuestions() {
  //   const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  //   // const options = { questionId: questionId, answer: answer };
  //   return this.api.get(`${ApiConst.baseUrl}/api/v3/recovery-questions`,
  //     {headers});
  // }

  // public getUserRecoveryQuestion() {
  //   const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization'));
  //   // const options = { questionId: questionId, answer: answer };
  //   return this.api.get(`${ApiConst.baseUrl}/api/v3/profile/recovery_question`,
  //     {headers});
  // }
}
