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
export interface Question {
    id: string;
    title: string;
    description: string;
    tags: string[];
    date: Date;
    userId: string;
}
export interface QuestionState {
    questions: Question[];
    isLoading: boolean;
    error: string;
}
