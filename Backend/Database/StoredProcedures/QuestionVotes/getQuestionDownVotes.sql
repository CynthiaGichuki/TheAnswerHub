CREATE PROCEDURE getQuestionDownVotes @questionID VARCHAR(255) AS BEGIN
SELECT COUNT(*) as downVotes
FROM questionVotes
WHERE questionID = @questionID
    AND vote_type = 'downvote'
END

