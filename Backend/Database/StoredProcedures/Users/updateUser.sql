CREATE PROCEDURE updateUser 
@userID VARCHAR(255),
@fullname VARCHAR(255),
@email VARCHAR(255),
@username VARCHAR(255),
@password VARCHAR(255),
@is_admin BIT,
@is_deleted BIT,
@is_sent BIT
AS BEGIN 
UPDATE Users
SET userID = @userID, fullname = @fullname, email = @email, username = @username, password = @password
WHERE userID = @userID
SELECT *
FROM Users
WHERE userID = @userID
END


