CREATE PROCEDURE GetQuestionVote @userID VARCHAR(255),
@questionID VARCHAR(255) AS BEGIN
SELECT *
FROM questionVotes
WHERE userID = @userID
    AND questionID = @questionID;
END