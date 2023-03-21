CREATE
OR ALTER PROCEDURE addAnswer @answerID VARCHAR(255),
@answerDescription VARCHAR(255),
@questionID VARCHAR(255),
@userID VARCHAR(255) AS BEGIN
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
SELECT *
FROM Answers
WHERE answerID = @answerID
END