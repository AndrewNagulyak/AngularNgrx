import { Action } from '@ngrx/store';
import {AuthorizationActionTypes} from './authorization.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: any;
}

export const initialState: AuthState = {
  loggedIn: true,
  user: undefined
};

export function authReducer(state: AuthState, action): AuthState {
  switch (action.type) {
    case  AuthorizationActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.data.user,
      };
    case  AuthorizationActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: {},
      };
    default :
      return state;
  }
}
