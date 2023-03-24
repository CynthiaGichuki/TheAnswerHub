import { createReducer,on} from "@ngrx/store";
import { loggedInUser } from "src/app/interfaces/interfaces";
import * as loginActions from "src/app/state/Actions/login.actions"


export interface loggedInUserState {
    user: loggedInUser | null;
    loading: boolean;
    error: any;
}

export interface AuthState {
    loggedIn: boolean;
  }
  
  const initialState: AuthState = {
    loggedIn: false,
  }

export const loggedInUserInitialState: loggedInUserState = {
    user: null,
    loading: false,
    error: null
}

export const loggedInUserReducer = createReducer(loggedInUserInitialState,

    on(loginActions.login, state => ({
         ...state,
          loading: true, 
          error: null })
          ),
    on(loginActions.loginSuccess, (state, { user }) => ({ 
        ...state,
         loading: false, 
         user: { ...user } })
         ),

    on(loginActions.loginError, (state, { error }) => ({
         ...state,
          loading: false, 
          error: error })
          ),
          on(loginActions.logout, (state) => ({
            ...state,
            isLoggedIn: false,
            token: null,
            errorMessage: null
          }))
);