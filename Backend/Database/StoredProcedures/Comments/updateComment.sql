CREATE OR ALTER PROCEDURE updateComment
@commentID VARCHAR(255),
@commentDescription VARCHAR(255),
@userID VARCHAR(255),
@answerID VARCHAR(255)
AS BEGIN 
UPDATE Comments
SET commentDescription = @commentDescription,
    userID = @userID,
    answerID = @answerID
WHERE commentID = @commentID
SELECT *
FROM Comments
WHERE commentID = @commentID
END

