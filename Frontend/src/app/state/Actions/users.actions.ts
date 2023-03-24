import { createAction, props } from "@ngrx/store";
import { User } from "src/app/interfaces/interfaces";


export const loadUsers = createAction(
    "[Users] Load Users"
);

export const loadUsersSuccess = createAction(
    "[Users] Load Users Success",

    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    "[Users] Load Users Error",

    props<{ error: any }>()
);

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ userID: string }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success'
);

export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: string }>()
);
    