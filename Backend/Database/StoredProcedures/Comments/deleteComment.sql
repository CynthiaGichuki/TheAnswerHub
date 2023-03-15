CREATE PROCEDURE deleteComment (@commentID VARCHAR(255)) AS BEGIN
DELETE FROM Comments
WHERE commentID = @commentID;
END;