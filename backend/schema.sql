-- POSTGRESQL SCHEMA FOR REFERENCE --
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Blog Table
CREATE TABLE movie_blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publish_date DATE NOT NULL,
    image_url VARCHAR(255)
);

-- User Table --
CREATE TABLE users(
    username VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL
);

-- Auth method implemented from the database
CREATE OR REPLACE FUNCTION auth_credentials(in_username VARCHAR(255), in_password VARCHAR(50))
RETURNS BOOLEAN AS
$$
DECLARE
    user_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE username = in_username AND password = crypt(in_password, password)
    ) INTO user_exists;
    RETURN user_exists;
END;
$$
LANGUAGE plpgsql;