import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/interfaces';
import * as AuthActions from '../Actions/auth.actions';

export interface AuthState {
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(AuthActions.logoutSuccess, state => ({ ...state, user: null, error: null })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, error })),
);

export const selectAuthState = (state: { auth: AuthState }) => state.auth;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
