
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnswerService } from '../../services/Answers/answer.service';
import * as AnswerActions from '../Actions/answer.actions';

@Injectable()
export class AnswerEffects {
  loadAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.loadAnswers),
      mergeMap(() =>
        this.answerService.getAnswers().pipe(
          map((answers) =>
            AnswerActions.loadAnswersSuccess({ answers })
          ),
          catchError((error) =>
            of(AnswerActions.loadAnswersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.addAnswer),
      mergeMap(({ answer }) =>
        this.answerService.addAnswer(answer).pipe(
          map((addedAnswer) =>
            AnswerActions.addAnswerSuccess({ answer: addedAnswer })
          ),
          catchError((error) =>
            of(AnswerActions.addAnswerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.updateAnswer),
      mergeMap(({ answer }) =>
        this.answerService.updateAnswer(answer).pipe(
          map(() =>
            AnswerActions.updateAnswerSuccess({ answer })
          ),
          catchError((error) =>
            of(AnswerActions.updateAnswerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswerActions.deleteAnswer),
      mergeMap(({ id }) =>
        this.answerService.deleteAnswer(`${id}`).pipe(
          map(() =>
            AnswerActions.deleteAnswerSuccess({ id })
          ),
          catchError((error) =>
            of(AnswerActions.deleteAnswerFailure({ error: error.message }))
          )
        )
      )
    )
  );






  constructor(
    private actions$: Actions,
    private answerService: AnswerService
  ) { }
}
