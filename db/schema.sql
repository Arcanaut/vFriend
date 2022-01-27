DROP DATABASE IF EXISTS vriend_db;
CREATE DATABASE vriend_db;
USE vriend_db;

CREATE TABLE game(
    game_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY,
    game_title VARCHAR(30) NOT NULL
)

CREATE TABLE player(
    player_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY,
    player_name VARCHAR(30) NOT NULL,
    player_email VARCHAR(30) NOT NULL,
    player_password VARCHAR(30) NOT NULL,
    tag_casual BOOLEAN,
    tag_forfun BOOLEAN,
    tag_ranked BOOLEAN,
    tag_experienced BOOLEAN,
    tag_new BOOLEAN,
    tag_microphone BOOLEAN,
    player_bio VARCHAR(120),
    player_friend INTEGER,
    FOREIGN KEY (player_friend)
    REFERENCES player(player_id)
    ON DELETE SET NULL,
)