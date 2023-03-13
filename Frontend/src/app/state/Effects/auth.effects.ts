import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../Actions/auth.actions';
import { UsersService } from 'src/app/services/users.service';


@Injectable()
export class AuthEffects {
    constructor(@Inject(Actions) private actions$: Actions, private userService: UsersService) { }


    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        exhaustMap(({ email, password }) =>
            this.userService.login(email, password).pipe(
                map(user => AuthActions.loginSuccess({ user })),
                catchError(error => of(AuthActions.loginFailure({ error: error.message })))
            )
        )
    ));


    // logout$ = createEffect(() => this.actions$.pipe(
    //     ofType(AuthActions.logout),
    //     exhaustMap(() =>
    //         this.userService.logout().pipe(
    //             map(() => AuthActions.logoutSuccess()),
    //             catchError(error => of(AuthActions.logoutFailure({ error: error.message })))
    //         )
    //     )
    // ));

}

