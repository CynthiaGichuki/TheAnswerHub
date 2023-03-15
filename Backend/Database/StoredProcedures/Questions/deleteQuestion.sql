CREATE PROCEDURE deleteQuestion (@questionID VARCHAR(255)) AS BEGIN
DELETE FROM Questions
WHERE questionID = @questionID;
END;