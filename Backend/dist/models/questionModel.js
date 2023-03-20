"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class questionModel {
    constructor(questionID, title, description, tagName, userID, is_deleted, created_at, updated_at) {
        this.questionID = questionID;
        this.title = title;
        this.description = description;
        this.tagName = tagName;
        this.userID = userID;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.default = questionModel;
