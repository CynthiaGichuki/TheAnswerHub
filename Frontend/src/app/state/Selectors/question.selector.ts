import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { QuestionState } from '../Reducers/question.reducer';

export const selectQuestionState = (state: AppState) => state.question;

export const selectQuestions = createSelector(
  selectQuestionState,
  (state: QuestionState) => state.questions
);

export const selectQuestionsLoading = createSelector(
  selectQuestionState,
  (state: QuestionState) => state.isLoading
);

export const selectQuestionsError = createSelector(
  selectQuestionState,
  (state: QuestionState) => state.error
);
