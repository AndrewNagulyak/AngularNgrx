import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {AuthorizationActionTypes} from '../pages/authorization/authorization.actions';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';



export interface AppState {
  router: RouterReducerState<any>;
  // tasks: TaskState
  // cards: CardsState
}


export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [  ] : [];
