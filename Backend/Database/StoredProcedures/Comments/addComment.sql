CREATE OR ALTER PROCEDURE addComment
@commentID VARCHAR(255),
@commentDescription VARCHAR(255),
@userID VARCHAR(255),
@answerID VARCHAR(255)
AS BEGIN 
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
SELECT *    
FROM Comments
WHERE commentID = @commentID
END


