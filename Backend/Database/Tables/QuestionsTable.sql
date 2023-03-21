CREATE TABLE Questions(
    questionID VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tagName VARCHAR(255) NOT NULL,
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    is_deleted BIT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME,
    CHECK (created_at <= GETDATE()),
    CHECK (title <> ''),
    CHECK (description <> ''),
);