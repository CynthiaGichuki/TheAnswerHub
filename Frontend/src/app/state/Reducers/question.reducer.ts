import { createReducer, on } from '@ngrx/store';
import { Question } from 'src/app/interfaces/interfaces';
import * as QuestionActions from '../Actions/question.action';

export interface QuestionState {
  questions: Question[];
  isLoading: boolean;
  error: string;
}

export const initialState: QuestionState = {
  questions: [],
  isLoading: false,
  error: ''
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, (state) => ({
    ...state,
    isLoading: true
  })),
  on(QuestionActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    isLoading: false,
    questions
  })),
  on(QuestionActions.loadQuestionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(QuestionActions.addQuestion, (state) => ({
    ...state,
    isLoading: true
  })),
  on(QuestionActions.addQuestionSuccess, (state, { question }) => ({
    ...state,
    isLoading: false,
    questions: [...state.questions, question]
  })),
  on(QuestionActions.addQuestionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(QuestionActions.updateQuestion, (state) => ({
    ...state,
    isLoading: true
  })),
  on(QuestionActions.updateQuestionSuccess, (state, { question }) => ({
    ...state,
    isLoading: false,
    questions: state.questions.map((q) =>
      q.questionID === question.questionID ? question : q
    )
  })),
  on(QuestionActions.updateQuestionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(QuestionActions.deleteQuestion, (state) => ({
    ...state,
    isLoading: true
  })),
  on(QuestionActions.deleteQuestionSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    questions: state.questions.filter((q) => q.questionID !== `${id}`)
  })),
  on(QuestionActions.deleteQuestionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);