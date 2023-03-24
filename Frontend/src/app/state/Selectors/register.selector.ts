import { createFeatureSelector, createSelector } from "@ngrx/store";
import { registeredUserState } from "../Reducers/register.reducer";

export const registerUserState = createFeatureSelector<registeredUserState>('registerUser')

export const selectRegisterUser = createSelector(
    registerUserState,
    (state: registeredUserState) => state.user
)

export const selectRegisterUserStateloading = createSelector(
    registerUserState,
    (state: registeredUserState) => state.loading
);

export const selectRegisterUserStateError = createSelector(
    registerUserState,
    (state: registeredUserState) => state.error
);