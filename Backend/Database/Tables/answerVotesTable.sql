CREATE TABLE answerVotes(
    voteID VARCHAR(255) NOT NULL PRIMARY KEY,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION,
    answerID VARCHAR(255) NULL,
    FOREIGN KEY (answerID) REFERENCES Answers(answerID) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL,
    CHECK (vote_type IN ('upvote', 'downvote')),
    CONSTRAINT UQ_UserAnswerVote UNIQUE (userID, answerID, vote_type)
);