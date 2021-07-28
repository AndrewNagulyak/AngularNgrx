import {Action} from '@ngrx/store';

export enum AuthorizationActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
}

export class Login implements Action {
  readonly type = AuthorizationActionTypes.LoginAction;

  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthorizationActionTypes.LogoutAction;

}


export type AuthorizationActions = Login | Logout;
