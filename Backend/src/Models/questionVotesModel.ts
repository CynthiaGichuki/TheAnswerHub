class questionVotesModel {
    voteID: string;
    userID: string;
    questionID: string;
    vote_type: string;

    constructor(voteID: string, userID: string, questionID: string, vote_type: string) {
        this.voteID = voteID;
        this.userID = userID;
        this.questionID = questionID;
        this.vote_type = vote_type;
    }
}


export default questionVotesModel;