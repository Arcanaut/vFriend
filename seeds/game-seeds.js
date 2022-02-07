const { Game } = require('../models');

const gameData = [
    {
        game_title: 'FPS/TPS',
    },
    {
        game_title: 'MMO/RPG',
    },
    {
        game_title: 'Sports/Other',
    },
];

const seedGames = () => Game.bulkCreate(gameData);

module.exports = seedGames;