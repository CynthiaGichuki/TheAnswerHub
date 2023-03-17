CREATE
OR ALTER PROC deleteUser @userID VARCHAR(255) AS BEGIN BEGIN TRY BEGIN TRANSACTION
DELETE FROM answerVotes
WHERE answerID IN (
        SELECT answerID
        FROM Answers
        WHERE userID = @userID
    )
DELETE FROM questionVotes
WHERE questionID IN (
        SELECT questionID
        FROM Questions
        WHERE userID = @userID
    )
DELETE FROM Answers
WHERE userID = @userID
DELETE FROM Questions
WHERE userID = @userID
DELETE FROM Users
WHERE userID = @userID COMMIT TRANSACTION
END TRY BEGIN CATCH IF @@TRANCOUNT > 0
SELECT 'Error deleting some records.' AS Message;
THROW;
END CATCH
END