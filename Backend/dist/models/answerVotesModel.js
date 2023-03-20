"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class answerVotesModel {
    constructor(voteID, userID, answerID, vote_type) {
        this.voteID = voteID;
        this.userID = userID;
        this.answerID = answerID;
        this.vote_type = vote_type;
    }
}
exports.default = answerVotesModel;
