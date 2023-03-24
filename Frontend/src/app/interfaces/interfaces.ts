export interface User {
    userID?: string
    fullname: string
    email: string
    username: string
    password: string
    is_sent?: string
    is_admin?: string
}
export interface logUser {
    email: string
    password: string
}

export interface registerUserSuccess {
    fullname: string
    registermessage: string
    token: string
}

export interface loggedInUser {
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
    userId: string;
    created_at?: Date;
    updated_at?: Date;
    
}

export interface addQuestionSuccess{
    message: Message;
    question: Question
}

export interface questionVoteCount{
    voteCount: number

}

export interface Answer {
    answerID: string;
    answerDescription: string;
    questionID: string;
    userID: string
}

export interface newQuestion {
    title: string;
    description: string;
    tagName: string;
}
export interface QuestionState {
    questions: Question[];
    isLoading: boolean;
    error: string;
}

export interface AnswerState {
    answers: Answer[];
    isLoading: boolean;
    error: string;
}
