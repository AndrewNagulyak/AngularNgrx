import {Action} from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',


  LOGIN_GOOGLE = '[Auth] Login Google',
  LOGIN_GOOGLE_SUCCESS = '[Auth] Login Google Success',
  LOGIN_GOOGLE_FAILURE = '[Auth] Login Google Failure',

  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',

  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  LOGOUT_FAILURE = '[Auth] Logout Failure',

  GET_PROFILE = '[Auth] Profile get',
  GET_PROFILE_SUCCESS = '[Auth] Profile get Success',
  GET_PROFILE_FAILURE = '[Auth] Profile get Failure'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {
  }
}


export class LogInGoogle implements Action {
  readonly type = AuthActionTypes.LOGIN_GOOGLE;

  constructor() {
  }
}

export class LogInGoogleSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_GOOGLE_SUCCESS;

  constructor(public payload: any) {
  }
}


export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {
  }
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: any) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

  constructor() {
  }
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;

  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;

  constructor(public payload: boolean = true) {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;

  constructor() {
  }
}

export class ProfileGet implements Action {
  readonly type = AuthActionTypes.GET_PROFILE;

  constructor() {
  }
}

export class ProfileGetSuccess implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class ProfileGetFailure implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_FAILURE;

  constructor(public payload: any) {
  }
}


export type AllAuthActions =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | LogInGoogleSuccess
  | ProfileGetSuccess;
