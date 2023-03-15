CREATE PROCEDURE GetQuestionById 
@questionID VARCHAR(255) AS BEGIN
SELECT *
FROM Questions
WHERE questionID = @questionID
END