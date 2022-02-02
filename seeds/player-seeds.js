const sequelize = require('../config/connection');
const { Player, Tag } = require('../models');

const playerData = [
    {
        username: 'username1',
        email: 'email1@gmail.com',
        password:'password1',
        game: null
    },
    {
        username: 'username2',
        email: 'email2@gmail.com',
        password:'password2',
        game: null
    },
    {
        username: 'username3',
        email: 'email3@gmail.com',
        password:'password3',
        game: null
    },
    {
        username: 'username4',
        email: 'email4@gmail.com',
        password:'password4',
        game: null
    },

];

const seedPlayers = () => Player.bulkCreate(playerData, {individualHooks: true});

module.exports = seedPlayers;