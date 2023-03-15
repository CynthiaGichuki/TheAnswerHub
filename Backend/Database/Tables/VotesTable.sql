CREATE TABLE Votes(
    voteID VARCHAR(255) NOT NULL PRIMARY KEY,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    questionID VARCHAR(255) NULL,
    FOREIGN KEY (questionID) REFERENCES Questions(questionID),
    answerID VARCHAR(255) NULL,
    FOREIGN KEY (answerID) REFERENCES Answers(answerID),
    vote_type VARCHAR(10) NOT NULL,
    CHECK (vote_type IN ('upvote', 'downvote'))
);
ALTER TABLE Votes
ADD CONSTRAINT UQ_UserQuestionAnswerVote UNIQUE (userID, questionID, answerID, vote_type);