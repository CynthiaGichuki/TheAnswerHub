"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class questionModel {
    constructor(commentID, commentDescription, userID, answerID, created_at) {
        this.commentID = commentID;
        this.commentDescription = commentDescription;
        this.userID = userID;
        this.answerID = answerID;
        this.created_at = created_at;
    }
}
exports.default = questionModel;
