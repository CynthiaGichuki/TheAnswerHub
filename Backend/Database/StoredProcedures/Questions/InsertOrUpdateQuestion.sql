CREATE PROCEDURE InsertOrUpdateQuestion @questionID VARCHAR(255),
@title VARCHAR(255),
@description VARCHAR(255),
@tagID VARCHAR(255),
@userID VARCHAR(255) AS BEGIN IF EXISTS(
    SELECT *
    FROM Questions
    WHERE questionID = @questionID
) BEGIN
UPDATE Questions
SET title = @title,
    description = @description,
    tagID = @tagID,
    userID = @userID,
    updated_at = GETDATE()
WHERE questionID = @questionID
END
ELSE BEGIN
INSERT INTO Questions (
        questionID,
        title,
        description,
        tagID,
        userID,
        created_at
    )
VALUES (
        @questionID,
        @title,
        @description,
        @tagID,
        @userID,
        GETDATE()
    )
END
END DROP PROCEDURE IF EXISTS InsertOrUpdateQuestion;