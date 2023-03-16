CREATE PROCEDURE getQuestionUpVotes @questionID VARCHAR(255) AS BEGIN
SELECT COUNT(*) as upVotes
FROM questionVotes
WHERE questionID = @questionID
    AND vote_type = 'upvote'
END

