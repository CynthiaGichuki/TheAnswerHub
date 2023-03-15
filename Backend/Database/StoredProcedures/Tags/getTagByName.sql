CREATE PROCEDURE GetTagByName
    @tagName VARCHAR(255)
AS
BEGIN
    SELECT * FROM Tag WHERE tagName = @tagName
END
