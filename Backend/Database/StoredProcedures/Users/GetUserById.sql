CREATE PROCEDURE getUserById @userID VARCHAR(255) AS BEGIN
SELECT *
FROM Users
WHERE userID = @userID
END

