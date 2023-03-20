class questionModel {
    questionID: string;
    title: string;
    description: string;
    tagName: string;
    userID: string;
    is_deleted: string;
    created_at: string;
    updated_at: string;

    constructor(questionID: string, title: string, description: string, tagName: string, userID: string, is_deleted: string, created_at: string, updated_at: string) {
        this.questionID = questionID;
        this.title = title;
        this.description = description;
        this.tagName = tagName;
        this.userID = userID;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at
    }
}


export default questionModel;