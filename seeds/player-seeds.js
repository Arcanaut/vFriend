const sequelize = require('../config/connection');
const { Player, Tag } = require('../models');

const playerData = [
    {
        username: 'username1',
        email: 'email1@gmail.com',
        password:'password1'
    },
    {
        username: 'username2',
        email: 'email2@gmail.com',
        password:'password2'
    },
    {
        username: 'username3',
        email: 'email3@gmail.com',
        password:'password3'
    },
    {
        username: 'username4',
        email: 'email4@gmail.com',
        password:'password4'
    },

];

const seedPlayers = () => Player.bulkCreate(playerData, {individualHooks: true});

module.exports = seedPlayers;