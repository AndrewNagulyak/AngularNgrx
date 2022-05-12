import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CardsState} from '../cards/cards.reducer';
import {AuthState} from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth')
export const isLoggedIn = createSelector(selectAuthState,
  auth => (auth && auth.isAuthenticated) || !!localStorage.getItem('Authorization'));
export const selectUser = createSelector(selectAuthState, auth => auth && auth.user);
