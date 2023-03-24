import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loggedInUserState } from "../Reducers/login.reducer";


export const selectLoggedInUserState = createFeatureSelector<loggedInUserState>('loggedInUser');

export const selectLoggedInUser =  createSelector(
    selectLoggedInUserState,
    (state: loggedInUserState) => state.user
);

export const selectLoggedInUserLoading = createSelector(
    selectLoggedInUserState,
    (state: loggedInUserState) => state.loading
);

export const selectLoggedInUserError = createSelector(
    selectLoggedInUserState,
    (state: loggedInUserState) => state.error
);

