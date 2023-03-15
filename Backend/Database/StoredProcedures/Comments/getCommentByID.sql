CREATE PROCEDURE getCommentById @commentID VARCHAR(255) AS BEGIN
SELECT *
FROM Comments
WHERE commentID = @commentID
END