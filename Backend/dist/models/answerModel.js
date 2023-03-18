"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class answerModel {
    constructor(answerID, answerDescription, questionID, userID, created_at) {
        this.answerID = answerID;
        this.answerDescription = answerDescription;
        this.questionID = questionID;
        this.userID = userID;
        this.created_at = created_at;
    }
}
exports.default = answerModel;
