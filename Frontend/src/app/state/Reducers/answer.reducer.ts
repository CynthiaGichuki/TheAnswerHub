import { createReducer, on } from '@ngrx/store';
import { Answer } from 'src/app/interfaces/interfaces';
import * as AnswerActions from '../Actions/answer.actions'

export interface AnswerState {
    answers: Answer[];
    isLoading: boolean;
    error: string;
}

export const initialState: AnswerState = {
    answers: [],
    isLoading: false,
    error: ''
};

export const answerReducer = createReducer(
    initialState,
    on(AnswerActions.loadAnswers, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AnswerActions.loadAnswersSuccess, (state, { answers }) => ({
        ...state,
        isLoading: false,
        answers
    })),
    on(AnswerActions.loadAnswersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(AnswerActions.addAnswer, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AnswerActions.addAnswerSuccess, (state, { answer }) => ({
        ...state,
        isLoading: false,
        answers: [...state.answers, answer]
    })),
    on(AnswerActions.addAnswerFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(AnswerActions.updateAnswer, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AnswerActions.updateAnswerSuccess, (state, { answer }) => ({
        ...state,
        isLoading: false,
        answers: state.answers.map((q) =>
            q.answerID === answer.answerID ? answer : q
        )
    })),
    on(AnswerActions.updateAnswerFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(AnswerActions.deleteAnswer, (state) => ({
        ...state,
        isLoading: true
    })),
    on(AnswerActions.deleteAnswerSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        answers: state.answers.filter((a) => a.answerID !== `${id}`)
    })),
    on(AnswerActions.deleteAnswerFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);