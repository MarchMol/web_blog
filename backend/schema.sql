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
('Dummy', 
'Chris Black Changed My Life', 'Portugal. The Man', 
'https://www.youtube.com/watch?v=8xT0vWporWs', 
'https://i.scdn.co/image/ab67616d0000b273a9c3cd9374b929b927e982c2',
'"Dummy" de Portugal The Man es una canción envolvente que combina 
ritmos vibrantes con letras introspectivas y trágicas con una fusión de 
géneros y energía contagiosa.', 
4.8, 
'2023-06-22', 
CURRENT_TIMESTAMP),

('Fire Coming out of the Monkeys Head', 
'Demon Dayz', 'Gorillaz', 
'https://www.youtube.com/watch?v=LtQHIv2O8x0', 
'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
'Es una canción cautivadora basada en una narrativa que combina excelentemente melodías inquietantes con una narración conmovedora. Con su fascinante instrumentación y letras que invitan a la reflexión, la canción transporta a los oyentes a un mundo vívido y surrealista. 
', 
4.6, 
'2005-05-11', 
CURRENT_TIMESTAMP),

('ALieNNation', 
'Virtue', 'The Voidz', 
'https://www.youtube.com/watch?v=DJD6vgEimBE', 
'https://images.genius.com/b21a928f858e13236ead0ac547f19dd8.1000x1000x1.png',
'Es una canción inmersiva que fusiona elementos de rock alternativo 
y synth-pop con letras introspectivas, creando una experiencia auditiva 
envolvente que invita a la reflexión sobre la alienación y la conexión humana. 
', 
4.7, 
'2018-03-15', 
CURRENT_TIMESTAMP),

('10 Lovers', 
'Turn Blue', 'The Black Keys', 
'https://www.youtube.com/watch?v=ktgqpEJsnHY', 
'https://upload.wikimedia.org/wikipedia/en/b/bb/Black_Keys_Turn_Blue_album_cover.png',
'Es una canción que cautiva con su ritmo contagioso y letras melódicas, 
creando una experiencia auditiva que te sumerge en un viaje emocional y nostálgico.
', 
4.5, 
'2014-05-12', 
CURRENT_TIMESTAMP),

('So Young', 
'Woodstock', 'Portugal. The Man', 
'https://www.youtube.com/watch?v=zzzffLkzNKY', 
'https://i1.sndcdn.com/artworks-wzJ9v75Vvgpu-0-t500x500.jpg',
'"So Young" es una vibrante y enérgica 
canción que combina ingeniosamente elementos de rock alternativo 
con letras contagiosas, ofreciendo una experiencia auditiva llena de vitalidad 
y frescura.
', 
4.8, 
'2017-06-15', 
CURRENT_TIMESTAMP),

('Aint No Rest For The Wicked', 
'Cage The Elephant', 'Cage The Elephant', 
'https://www.youtube.com/watch?v=qLP9FaocIUk', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMaP1HJlcMqOOFCyrkalVgExpZJ5FXBlGHiXVefs6lQg&s',
'Es un himno implacable que fusiona el rock alternativo con letras crudas y una energía 
inquebrantable, dejando una huella imborrable en cada nota.
', 
4.3, 
'2008-06-16', 
CURRENT_TIMESTAMP),

('Blossom', 
'Blossom', 'Milky Chance', 
'https://www.youtube.com/watch?v=KEaslWvWHEU', 
'https://upload.wikimedia.org/wikipedia/en/8/85/Milky_Chance_-_Blossom_cover.jpg',
'"Blossom" envuelve al oyente con su atmósfera relajante y letras reflexivas, 
creando una experiencia auditiva cautivadora y llena de calidez.
', 
4.3, 
'2017-03-09', 
CURRENT_TIMESTAMP),

('Ignorance', 
'Brand New Eyes', 'Paramore', 
'https://www.youtube.com/watch?v=OH9A6tn_P6g', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw2Dqdt8ialV6-ClTtfZ-bGhc3bt5JsezMIVLXZhJWRsDmjtNZdK1trnjCREwE_QxRMx4&usqp=CAU',
'Es una explosión de energía emocional y sonidos contundentes que captura la frustración 
y el desencanto con una fuerza arrolladora.
', 
4.4, 
'2009-07-07', 
CURRENT_TIMESTAMP),

('Santeria', 
'Sublime', 'Sublime', 
'https://www.youtube.com/watch?v=AEYN5w4T_aM', 
'https://i.scdn.co/image/ab67616d0000b2738fc4b0dcfb9509553f195c85',
'Emblemática pista que fusiona el reggae con el punk rock, destacando 
por su energía contagiosa y letras memorables que narran una historia de amor 
y venganza con un ritmo irresistible.
', 
4.6, 
'1996-06-07', 
CURRENT_TIMESTAMP),

('Mr. Crowley', 
'Ozzy Osbourne', 'Memoirs of a Madman', 
'https://www.youtube.com/watch?v=o0RE230PlX4', 
'https://upload.wikimedia.org/wikipedia/en/b/b3/Ozzy_Osbourne_-_Memoirs.jpg',
'"Mr. Crowley" de Ozzy Osbourne es una obra maestra del heavy metal que destaca 
por su atmósfera oscura, poderosos riffs de guitarra y la inconfundible voz de Ozzy, 
dejando una huella imborrable en la historia del rock
', 
4.6, 
'1980-04-19', 
CURRENT_TIMESTAMP),

('Sleeping With A Friend', 
'Neon Trees', 'Pop Psychology', 
'https://www.youtube.com/watch?v=s3u9IrGgtXQ', 
'https://upload.wikimedia.org/wikipedia/en/3/3f/Neon_Trees_-_%22Sleeping_With_a_Friend%22_%28Single%29.jpg',
'"Sleeping With a Friend" de Neon Trees es un himno pop vibrante y contagioso 
que captura la emoción y la intriga de las relaciones modernas.
', 
4.3, 
'2014-01-11', 
CURRENT_TIMESTAMP),

('This is How I Disappear', 
'My Chemical Romance', 'The Black Parade', 
'https://www.youtube.com/watch?v=3df8CooYnSs', 
'https://i.scdn.co/image/ab67616d0000b27317f77fab7e8f18d5f9fee4a1',
'Canción electrizante que combina la intensidad emocional con la energía cruda del 
rock alternativo, envolviendo al oyente en una montaña rusa de emociones.
', 
4.7, 
'2006-10-20', 
CURRENT_TIMESTAMP);



