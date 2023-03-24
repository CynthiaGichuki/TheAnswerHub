import { Action, createReducer, on } from "@ngrx/store";
import { registerUserSuccess } from "src/app/interfaces/interfaces";
import { register, registerSuccess, registerError } from "../Actions/register.action";


export interface registeredUserState {
  user: registerUserSuccess | null;
  loading: boolean
  error: any
}

export const registeredUserinitialState: registeredUserState = {
  user: null,
  loading: false,
  error: null
};
export const registerUserReducer = createReducer(
  registeredUserinitialState,
  on(register, (state, { user }) => ({ ...state, loading: true, error: null, })),
  on(registerSuccess, (state, { user }) => ({ ...state, loading: false, user: { ...user }, error: null })),
  on(registerError, (state, { error }) => ({ ...state, loading: false, error: { ...error } }))
)

export function reducer(state: any, action: Action) {
  return registerUserReducer(state, action)
}