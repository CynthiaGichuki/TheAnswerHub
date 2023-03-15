CREATE PROCEDURE getAnswerDownVotes
    @answerID VARCHAR(255)
AS
BEGIN
    SELECT COUNT(*) as downVotes FROM Votes WHERE answerID = @answerID AND vote_type = 'downvote'
END
