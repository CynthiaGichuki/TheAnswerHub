import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/interfaces/interfaces";
import * as UsersActions from '../Actions/users.actions';


export interface UsersState {
    users: User[];
    loading: boolean;
    error: any;
}


export const initialState: UsersState = {
    users: [],
    loading: true,
    error: null
};


export const usersReducer = createReducer(
    initialState,
    on(UsersActions.loadUsers, (state) => {
        return {
            ...state,
            loading: false
        }
    }
    ),
    on(UsersActions.loadUsersSuccess, (state, { users }) => {
        return {
            ...state,
            loading: false,
            users: [...users]
        }
    }

    ),
    on(UsersActions.loadUsersFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error
        }
    }
    ),
    on(UsersActions.deleteUser, (state) => ({
        ...state,
        isLoading: true
    })),
    on(UsersActions.deleteUserSuccess, (state) => ({
        ...state,
        isLoading: false,
    })),
    on(UsersActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);



