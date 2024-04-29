-- POSTGRESQL SCHEMA FOR REFERENCE --
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Blog Table
CREATE TABLE music_blog (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    album VARCHAR(255),
    artist VARCHAR(255),
    music TEXT,
    cover_art TEXT, 
    content TEXT,
    rank DOUBLE PRECISION,
    album_date DATE,
    post_date TIMESTAMP 
);


-- User Table --
CREATE TABLE users(
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Auth method implemented from the database
CREATE OR REPLACE FUNCTION auth_credentials(in_username VARCHAR(255), in_password VARCHAR(255))
RETURNS BOOLEAN AS
$$
DECLARE
    user_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE username = in_username AND password = in_password
    ) INTO user_exists;
    RETURN user_exists;
END;
$$
LANGUAGE plpgsql;

-- INSERTS --

INSERT INTO music_blog (name, album, artist, music, cover_art, content, rank, album_date, post_date) 
VALUES 
('Dummy', 'Chris Black Changed My Life', 'Portugal. The Man', 'https://www.youtube.com/watch?v=8xT0vWporWs', 'https://i.scdn.co/image/ab67616d0000b273a9c3cd9374b929b927e982c2','"Dummy" de Portugal The Man es una canción envolvente que combina ritmos vibrantes con letras introspectivas y trágicas con una fusión de géneros y energía contagiosa.', 4.8, '2023-06-22', CURRENT_TIMESTAMP);
