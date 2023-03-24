import { QuestionState } from '../state/Reducers/question.reducer';
import { AnswerState } from './Reducers/answer.reducer';
import { AuthState, loggedInUserState } from './Reducers/login.reducer';
import { registeredUserState } from './Reducers/register.reducer';
import { UsersState } from './Reducers/users.reducer';

export interface AppState {
    users: UsersState
    login: loggedInUserState
    question: QuestionState;
    answer: AnswerState;
    register: registeredUserState
    logout: AuthState
}

