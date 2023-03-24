import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswerState } from '../../interfaces/interfaces';


export const selectAnswerState =
  createFeatureSelector<AnswerState>('answer');

export const selectAllAnswers = createSelector(
  selectAnswerState,
  (state) => state.answers
);

export const selectAnswerById = (answerID: string) => createSelector(
  selectAllAnswers,
  (answers) => answers.find((answer) => answer.answerID === answerID)
)

export const selectAnswerLoading = createSelector(
  selectAnswerState,
  (state) => state.isLoading
);

export const selectAnswerError = createSelector(
  selectAnswerState,
  (state) => state.error
);
export const selectUserAnswers = createSelector(
  selectAnswerState,
  (state: AnswerState, userId: string) => state.answers.filter(a => a.userID === userId)
);
