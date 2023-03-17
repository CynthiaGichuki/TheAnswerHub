"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class questionModel {
    constructor(questionID, title, tagName, userID, is_deleted, created_at, updated_at) {
        this.questionID = questionID;
        this.title = title;
        this.tagName = tagName;
        this.userID = userID;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.upadted_at = updated_at;
    }
}
exports.default = questionModel;
