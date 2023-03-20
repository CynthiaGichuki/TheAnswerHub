"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class questionVotesModel {
    constructor(voteID, userID, questionID, vote_type) {
        this.voteID = voteID;
        this.userID = userID;
        this.questionID = questionID;
        this.vote_type = vote_type;
    }
}
exports.default = questionVotesModel;
