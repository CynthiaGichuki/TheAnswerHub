CREATE PROCEDURE InsertOrUpdateAnswer @answerID VARCHAR(255),
@answerDescription VARCHAR(255),
@questionID VARCHAR(255),
@userID VARCHAR(255) AS BEGIN IF EXISTS(
    SELECT *
    FROM Answers
    WHERE answerID = @answerID
) BEGIN
UPDATE Answers
SET answerDescription = @answerDescription,
    questionID = @questionID,
    userID = @userID
WHERE answerID = @answerID
END
ELSE BEGIN
INSERT INTO Answers (
        answerID,
        answerDescription,
        questionID,
        userID,
        created_at
    )
VALUES (
        @answerID,
        @answerDescription,
        @questionID,
        @userID,
        GETDATE()
    )
END
END