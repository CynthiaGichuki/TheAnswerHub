CREATE PROCEDURE InsertorUpdateAnswerVote
@voteID VARCHAR(255),
@userID VARCHAR(255),
@answerID VARCHAR(255),
@voteType VARCHAR(10)
AS
BEGIN
    DECLARE @existingVoteType VARCHAR(10)
    SELECT @existingVoteType = vote_type FROM Votes WHERE userID = @userID AND answerID = @answerID

    IF @existingVoteType IS NOT NULL
    BEGIN
        UPDATE Votes SET vote_type = @voteType WHERE userID = @userID AND answerID = @answerID
    END
    ELSE
    BEGIN
        INSERT INTO Votes (voteID, userID, answerID, vote_type) VALUES (@voteID, @userID, @answerID, @voteType)
    END
END
