CREATE TABLE Answers(
    answerID VARCHAR(255) NOT NULL PRIMARY KEY,
    answerDescription VARCHAR(255) NOT NULL,
    questionID VARCHAR(255) NOT NULL,
    FOREIGN KEY (questionID) REFERENCES Questions(questionID) ON DELETE CASCADE,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CHECK (created_at <= GETDATE()),
    CHECK (answerDescription <> '')
);