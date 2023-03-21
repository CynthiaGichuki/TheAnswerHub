export interface User {
    userId: string
    fullname: string
    email: string
    username: string
    password: string
}
export interface logUser {
    email: string
    password: string
}

export interface registerSuccess {
    fullname: string
    registermessage: string
    token: string
}

export interface loginSuccess {
    message: string
    token: string
    is_admin: string
    fullname: string
}
export interface Message {
    message: string
}

export interface Question {
    questionID: string;
    title: string;
    description: string;
    tagName: string;
    date: Date;
    userId: string;
}
export interface QuestionState {
    questions: Question[];
    isLoading: boolean;
    error: string;
}
