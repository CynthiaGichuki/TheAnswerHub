CREATE PROCEDURE getAnswerVoteCount
    @answerID VARCHAR(255)
AS
BEGIN
    DECLARE @voteCount INT
    SELECT @voteCount = COUNT(*) FROM Votes WHERE answerID = @answerID AND vote_type = 'upvote'
    SELECT @voteCount = @voteCount - COUNT(*) FROM Votes WHERE answerID = @answerID AND vote_type = 'downvote'

    SELECT @voteCount AS voteCount
END
