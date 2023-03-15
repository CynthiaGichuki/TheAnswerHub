CREATE TABLE Questions(
    questionID VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tagID VARCHAR(255) NOT NULL,
    FOREIGN KEY (tagID) REFERENCES Tag(tagID),
    userID VARCHAR(255) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME,
    CHECK (created_at <= GETDATE()),
    CHECK (title <> ''),
    CHECK (description <> ''),
);