import { UsersState } from "../Reducers/users.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUsersState = createFeatureSelector<UsersState>('users');


export const selectUsers = createSelector(
    selectUsersState,
    (state: UsersState) => state.users
);


export const selectUsersLoading = createSelector(
    selectUsersState,
    (state: UsersState) => state.loading
);


export const selectUsersError = createSelector(
    selectUsersState,
    (state: UsersState) => state.error
);

export const selectUserById = (userID: string) => createSelector(
    selectUsers,
    (users) => users.find((user) => user.userID === userID)
  )