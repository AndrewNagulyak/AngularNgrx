import {UserModel} from '../../shared/models/user.model';
import {AllAuthActions, AuthActionTypes} from './authorization.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: UserModel | null;
  // error message
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer(state = initialState, action: AllAuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {...state}
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          displayName: action.payload.displayName,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_GOOGLE_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          displayName: action.payload.displayName,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    case AuthActionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: 'Failed registration'
      };
    }
    case AuthActionTypes.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: localStorage.getItem('Authorization'),
          displayName: action.payload.displayName,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        errorMessage: 'Failed logout'
      };
    }

    default: {
      return state;
    }
  }

}
