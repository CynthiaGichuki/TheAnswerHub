CREATE PROCEDURE getQuestionUpVotes
    @questionID VARCHAR(255)
AS
BEGIN
    SELECT COUNT(*) as upVotes FROM Votes WHERE questionID = @questionID AND vote_type = 'upvote'
END
