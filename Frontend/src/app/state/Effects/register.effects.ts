import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, catchError, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { register, registerSuccess, registerError } from "../Actions/register.action";
import { UsersService } from "src/app/services/Users/users.service";

@Injectable()
export class RegisterUserEffects {
    constructor(private actions$: Actions, private userService: UsersService) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            mergeMap((action) =>
                this.userService.register(action.user).pipe(
                    tap((user) =>{
                        console.log("UserService", user);
                        localStorage.setItem("token", user.token)
                        
                    }),
                    map((user) => registerSuccess({ user })),
                    catchError(async (error) => registerError({ error }))
                )
            )
        )
    );
}