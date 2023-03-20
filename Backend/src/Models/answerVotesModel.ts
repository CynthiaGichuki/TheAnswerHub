class answerVotesModel {
    voteID: string;
    userID: string;
    answerID: string;
    vote_type: string;

    constructor(voteID: string, userID: string, answerID: string, vote_type: string) {
        this.voteID = voteID;
        this.userID = userID;
        this.answerID = answerID;
        this.vote_type = vote_type;
    }
}


export default answerVotesModel;