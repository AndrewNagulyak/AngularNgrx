import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {authReducer} from '../pages/authorization/auth.reducer';



export interface AppState {
  router: RouterReducerState<any>;
}


export const reducers: ActionReducerMap<any> = {
  router: routerReducer,
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [  ] : [];
