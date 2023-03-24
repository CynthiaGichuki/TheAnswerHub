import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, tap, map, mergeMap } from "rxjs";
import { UsersService } from "src/app/services/Users/users.service";
import * as loginActions from "src/app/state/Actions/login.actions"




@Injectable()
export class LoggedInUserEffects {
    constructor(private actions$: Actions, private userService: UsersService) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.login),
            mergeMap((action) =>
                this.userService.login(action.user).pipe(
                    tap((user) => {
                        console.log("UserService:", user);
                        localStorage.setItem("token", user.token)
                    }),
                    map((user) => loginActions.loginSuccess({ user })),
                    catchError(async (error) => loginActions.loginError({ error }))
                ))
        ))
}