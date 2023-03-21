CREATE
OR ALTER PROCEDURE createQuestion @questionID VARCHAR(255),
@title VARCHAR(255),
@tagName VARCHAR(255),
@description VARCHAR(255),
@userID VARCHAR(255),
@is_deleted BIT AS BEGIN
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
SELECT *
FROM Questions
WHERE questionID = @questionID
END