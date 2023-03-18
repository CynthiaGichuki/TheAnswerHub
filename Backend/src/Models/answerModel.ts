class answerModel {
    answerID: string;
    answerDescription: string;
    questionID: string;
    userID: string;
    created_at: string;

    constructor(answerID: string, answerDescription: string, questionID: string, userID: string, created_at: string) {
        this.answerID = answerID;
        this.answerDescription = answerDescription;
        this.questionID = questionID;
        this.userID = userID;
        this.created_at = created_at
    }
}


export default answerModel;