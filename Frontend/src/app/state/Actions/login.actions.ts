
import { createAction, props } from "@ngrx/store";
import { loggedInUser, logUser } from "src/app/interfaces/interfaces";


export const login = createAction('[Login] Login', props<{ user: logUser }>());

export const loginSuccess = createAction('[Login] Login Success', props<{ user: loggedInUser }>());

export const loginError = createAction('[Login] Login Error', props<{ error: any }>());

export const logout = createAction('[Logout] Logout');

export const logoutSuccess = createAction('[Logout] Logout Success', props<{ user: loggedInUser }>());

export const logoutError = createAction('[Logout] Logout Error', props<{ error: any }>());