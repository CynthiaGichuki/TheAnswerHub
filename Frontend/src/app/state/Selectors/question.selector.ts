import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionState } from '../../interfaces/interfaces';


export const selectQuestionState =
  createFeatureSelector<QuestionState>('question');

export const selectAllQuestions = createSelector(
  selectQuestionState,
  (state) => state.questions
);

export const selectQuestionById = (questionID: string) => createSelector(
  selectAllQuestions,
  (questions) => questions.find((question) => question.questionID === questionID)
)

export const selectQuestionLoading = createSelector(
  selectQuestionState,
  (state) => state.isLoading
);

export const selectQuestionError = createSelector(
  selectQuestionState,
  (state) => state.error
);
export const selectUserQuestions = createSelector(
  selectQuestionState,
  (state: QuestionState, userId: string) => state.questions.filter(q => q.userId === userId)
);
