const { Game } = require('../models');

const gameData = [
    {
        game_title: 'game1',
    },
    {
        game_title: 'game2',
    },
    {
        game_title: 'game3',
    },
];

const seedGames = () => Game.bulkCreate(gameData);

module.exports = seedGames;