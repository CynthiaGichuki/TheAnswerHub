
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuestionService } from '../../services/Question/question.service';
import * as QuestionActions from '../Actions/question.action';

@Injectable()
export class QuestionEffects {
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      mergeMap(() =>
        this.questionService.getQuestions().pipe(
          map((questions) =>
            QuestionActions.loadQuestionsSuccess({ questions })
          ),
          catchError((error) =>
            of(QuestionActions.loadQuestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.addQuestion),
      mergeMap(({ question }) =>
        this.questionService.addQuestion(question).pipe(
          map((addedQuestion) =>
            QuestionActions.addQuestionSuccess({ question: addedQuestion })
          ),
          catchError((error) =>
            of(QuestionActions.addQuestionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.updateQuestion),
      mergeMap(({ question }) =>
        this.questionService.updateQuestion(question).pipe(
          map(() =>
            QuestionActions.updateQuestionSuccess({ question })
          ),
          catchError((error) =>
            of(QuestionActions.updateQuestionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  getQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.getQuestion),
      mergeMap(({ questionID }) =>
        this.questionService.getQuestionById(`${questionID}`).pipe(
          map(() =>
            QuestionActions.getQuestionSuccess({ questionID })
          ),
          catchError((error) =>
            of(QuestionActions.getQuestionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.deleteQuestion),
      mergeMap(({ questionID }) =>
        this.questionService.deleteQuestion(`${questionID}`).pipe(
          map(() =>
            QuestionActions.deleteQuestionSuccess({ questionID })
          ),
          catchError((error) =>
            of(QuestionActions.deleteQuestionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  getQuestionVoteCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.getQuestionVoteCount),
      mergeMap(({ questionID }) =>
        this.questionService.getQuestionVoteCount(`${questionID}`).pipe(
          map(() =>
            QuestionActions.getQuestionVoteCount({ questionID })
          ),
          catchError((error) =>
            of(QuestionActions.getQuestionVoteCountFailure({ error: error.message }))
          )
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private questionService: QuestionService
  ) { }
}
