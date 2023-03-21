CREATE TABLE Comments(
    commentID VARCHAR(255) NOT NULL PRIMARY KEY,
    commentDescription VARCHAR(255) NOT NULL,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION,
    answerID VARCHAR(255) NOT NULL,
    FOREIGN KEY (answerID) REFERENCES Answers(answerID) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CHECK (created_at <= GETDATE()),
    CHECK (commentDescription <> '')
);