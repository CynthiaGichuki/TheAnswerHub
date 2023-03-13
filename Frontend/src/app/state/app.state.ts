import { AuthState } from '../state/Reducers/auth.reducer';
import { QuestionState } from '../state/Reducers/question.reducer';

export interface AppState {
    user: AuthState;
    question: QuestionState;
}
