CREATE TABLE questionVotes(
    voteID VARCHAR(255) NOT NULL PRIMARY KEY,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION,
    questionID VARCHAR(255) NULL,
    FOREIGN KEY (questionID) REFERENCES Questions(questionID) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL,
    CHECK (vote_type IN ('upvote', 'downvote')),
    CONSTRAINT UQ_UserQuestionVote UNIQUE (userID, questionID, vote_type)
);