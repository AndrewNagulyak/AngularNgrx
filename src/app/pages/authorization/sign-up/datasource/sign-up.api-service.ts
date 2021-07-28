import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConst} from '../../../../shared/enums/environment.enum';

@Injectable()
export class SignUpApiService {

  constructor(private api: HttpClient) {}

  public signUp(params) {
    return this.api.post(`${ApiConst.baseUrl}/auth/signup`, params);
  }

  public signUpFinalize(params) {
    return this.api.post(`${ApiConst.baseUrl}/auth/finalize`, params);
  }

}
