CREATE
OR ALTER PROCEDURE updateAnswer @answerID VARCHAR(255),
@answerDescription VARCHAR(255),
@questionID VARCHAR(255),
@userID VARCHAR(255) AS BEGIN
UPDATE Answers
SET answerDescription = @answerDescription,
    questionID = @questionID,
    userID = @userID
WHERE answerID = @answerID
SELECT *
FROM Answers
WHERE answerID = @answerID
END