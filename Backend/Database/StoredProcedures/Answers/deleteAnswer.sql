CREATE PROCEDURE deleteAnswer (@answerID VARCHAR(255)) AS BEGIN
DELETE FROM Answers
WHERE answerID = @answerID;
END;