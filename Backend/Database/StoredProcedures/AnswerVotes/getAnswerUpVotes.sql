CREATE PROCEDURE getAnswerUpVotes @answerID VARCHAR(255) AS BEGIN
SELECT COUNT(*) as upVotes
FROM answerVotes
WHERE answerID = @answerID
    AND vote_type = 'upvote'
END


