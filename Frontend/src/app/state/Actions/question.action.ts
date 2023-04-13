import { createAction, props } from '@ngrx/store';
import { Question } from '../../interfaces/interfaces';

export const loadQuestions = createAction('[Question] Load Questions');

export const loadQuestionsSuccess = createAction(
  '[Question] Load Questions Success',
  props<{ questions: Question[] }>()
);

export const loadQuestionsFailure = createAction(
  '[Question] Load Questions Failure',
  props<{ error: string }>()
);

export const addQuestion = createAction(
  '[Question] Add Question',
  props<{ question: Question }>()
);
export const getQuestion = createAction(
  '[Question] Get Question',
  props<{ questionID: string }>()
);

export const getQuestionSuccess = createAction(
  '[Question] Get Question Success',
  props<{ questionID: string }>()
);

export const getQuestionFailure = createAction(
  '[Question] Get Question Failure',
  props<{ error: string }>()
);

export const getQuestionVoteCount = createAction(
  '[Question] Get Question Vote Count',
  props<{ questionID: string }>()
);

export const getQuestionVoteCountSuccess = createAction(
  '[Question] Get Question Vote Count',
  props<{ questionID: string }>()
);

export const getQuestionVoteCountFailure = createAction(
  '[Question] Get Question Vote Count Failure',
  props<{ error: string }>()
);

export const addQuestionSuccess = createAction(
  '[Question] Add Question Success',
  props<{ question: Question }>()
);

export const addQuestionFailure = createAction(
  '[Question] Add Question Failure',
  props<{ error: string }>()
);

export const updateQuestion = createAction(
  '[Question] Update Question',
  props<{ question: Question }>()
);

export const updateQuestionSuccess = createAction(
  '[Question] Update Question Success',
  props<{ question: Question }>()
);

export const updateQuestionFailure = createAction(
  '[Question] Update Question Failure',
  props<{ error: string }>()
);

export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ questionID: string }>()
);

export const deleteQuestionSuccess = createAction(
  '[Question] Delete Question Success',
  props<{ questionID: string }>()
);

export const deleteQuestionFailure = createAction(
  '[Question] Delete Question Failure',
  props<{ error: string }>()
);
