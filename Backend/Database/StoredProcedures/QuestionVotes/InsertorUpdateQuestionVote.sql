CREATE PROCEDURE InsertorUpdateQuestionVote @voteID VARCHAR(255),
@userID VARCHAR(255),
@questionID VARCHAR(255),
@voteType VARCHAR(10) AS BEGIN
DECLARE @existingVoteType VARCHAR(10)
SELECT @existingVoteType = vote_type
FROM questionVotes
WHERE userID = @userID
    AND questionID = @questionID IF @existingVoteType IS NOT NULL BEGIN -- If the user has already voted for this question, update the existing vote
UPDATE questionVotes
SET vote_type = @voteType
WHERE userID = @userID
    AND questionID = @questionID
END
ELSE BEGIN -- If the user has not voted for this question, insert a new vote
INSERT INTO questionVotes (voteID, userID, questionID, vote_type)
VALUES (@voteID, @userID, @questionID, @voteType)
END
END