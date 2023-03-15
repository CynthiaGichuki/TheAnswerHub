CREATE PROCEDURE InsertOrUpdateUser @userID VARCHAR(255),
@fullname VARCHAR(255),
@email VARCHAR(255),
@username VARCHAR(255),
@password VARCHAR(255),
@is_admin BIT AS BEGIN IF EXISTS (
    SELECT *
    FROM Users
    WHERE userID = @userID
) BEGIN
UPDATE Users
SET fullname = @fullname,
    email = @email,
    username = @username,
    password = @password,
    is_admin = @is_admin
WHERE userID = @userID
SELECT *
FROM Users
WHERE userID = @userID
END
ELSE BEGIN
INSERT INTO Users (userID, fullname, email, username, password)
VALUES (@userID, @fullname, @email, @username, @password)
SELECT *
FROM Users
WHERE userID = @userID
END
END