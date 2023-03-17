"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor(userID, fullname, email, username, password, is_admin, is_deleted) {
        this.userID = userID;
        this.fullname = fullname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
        this.is_deleted = is_deleted;
    }
}
exports.default = UserModel;
