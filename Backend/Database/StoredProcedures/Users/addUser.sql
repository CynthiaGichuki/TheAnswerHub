CREATE PROCEDURE addUser 
@userID VARCHAR(255),
@fullname VARCHAR(255),
@email VARCHAR(255),
@username VARCHAR(255),
@password VARCHAR(255),
@is_admin BIT,
@is_deleted BIT,
@is_sent BIT
AS BEGIN 
INSERT INTO Users (userID, fullname, email, username, password)
VALUES (@userID, @fullname, @email, @username, @password)
SELECT *
FROM Users
WHERE userID = @userID
END


