import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../Actions/auth.actions';
import { UsersService } from 'src/app/services/Users/users.service';


@Injectable()
export class AuthEffects {
  constructor(@Inject(Actions) private actions$: Actions, private userService: UsersService) { }


  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.login),
  //   exhaustMap(({ email, password }) =>
  //     this.userService.login({ email, password }).pipe(
  //       map(loguser => AuthActions.loginSuccess({ loguser })),
  //       catchError(error => of(AuthActions.loginFailure({ error: error.message })))
  //     )
  //   )
  // ));




}

