import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import * as usersActions from "../Actions/users.actions";
import { of } from "rxjs";
import { UsersService } from "src/app/services/Users/users.service";


@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UsersService
    ) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.loadUsers),
        mergeMap(() => this.userService.getUsers().pipe(
            map(users => usersActions.loadUsersSuccess({ users })),
            catchError(error => of(usersActions.loadUsersFailure({ error })))
        )),
    ));

    deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.deleteUser),
      mergeMap(({ userID }) =>
        this.userService.deleteUser(`${userID}`).pipe(
          map(() =>
            usersActions.deleteUserSuccess()
          ),
          catchError((error) =>
            of(usersActions.deleteUserFailure({ error: error.message }))
          )
        )
      )
    )
  );



}
