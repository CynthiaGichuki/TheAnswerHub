CREATE PROCEDURE InsertTag
@tagID VARCHAR(255),
@tagName VARCHAR(255)
AS
BEGIN
    INSERT INTO Tag (tagID, tagName) VALUES (@tagID, @tagName)
END