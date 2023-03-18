class questionModel {
    commentID: string;
    commentDescription: string;
    userID: string;
    answerID: string;
    created_at: string;

    constructor(commentID: string, commentDescription: string, userID: string, answerID: string, created_at: string) {
        this.commentID = commentID;
        this.commentDescription = commentDescription;
        this.userID = userID;
        this.answerID = answerID;
        this.created_at = created_at;
    }
}


export default questionModel;