CREATE TABLE Users(
    userID VARCHAR(255) NOT NULL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BIT NOT NULL DEFAULT 0,
    is_deleted BIT NOT NULL DEFAULT 0,
    CHECK (is_admin IN (0, 1)),
    CHECK (email <> ''),
    CHECK (password <> '')
);