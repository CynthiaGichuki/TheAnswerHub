class UserModel {
    userID: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    is_admin: string;
    is_deleted: string;

    constructor(userID: string, fullname: string, email: string, username: string, password: string, is_admin: string, is_deleted: string) {
        this.userID = userID;
        this.fullname = fullname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
        this.is_deleted = is_deleted;
    }
}


export default UserModel;