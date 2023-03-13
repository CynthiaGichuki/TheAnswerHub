import { createAction, props } from '@ngrx/store';
import { logUser, User } from 'src/app/interfaces/interfaces';


export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ loguser: logUser }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());
