CREATE PROCEDURE InsertOrUpdateQuestion @questionID VARCHAR(255),
@title VARCHAR(255),
@tagName VARCHAR(255),
@description VARCHAR(255),
@userID VARCHAR(255),
@is_deleted BIT AS BEGIN IF EXISTS(
    SELECT *
    FROM Questions
    WHERE questionID = @questionID
) BEGIN
UPDATE Questions
SET title = @title,
    tagName = @tagName,
    description = @description,
    userID = @userID,
    is_deleted = @is_deleted,
    updated_at = GETDATE()
WHERE questionID = @questionID
END
ELSE BEGIN
INSERT INTO Questions (
        questionID,
        title,
        tagName,
        description,
        userID,
        created_at
    )
VALUES (
        @questionID,
        @title,
        @tagName,
        @description,
        @userID,
        GETDATE()
    )
END
END