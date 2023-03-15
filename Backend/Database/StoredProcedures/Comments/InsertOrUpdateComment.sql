CREATE PROCEDURE InsertOrUpdateComment @commentID VARCHAR(255),
@commentDescription VARCHAR(255),
@userID VARCHAR(255),
@answerID VARCHAR(255) AS BEGIN IF EXISTS(
    SELECT *
    FROM Comments
    WHERE commentID = @commentID
) BEGIN
UPDATE Comments
SET commentDescription = @commentDescription,
    userID = @userID,
    answerID = @answerID
WHERE commentID = @commentID
END
ELSE BEGIN
INSERT INTO Comments (
        commentID,
        commentDescription,
        userID,
        answerID,
        created_at
    )
VALUES (
        @commentID,
        @commentDescription,
        @userID,
        @answerID,
        GETDATE()
    )
END
END