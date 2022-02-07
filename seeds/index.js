const seedPlayers = require('./player-seeds');
const seedGames = require('./game-seeds');
const seedTags = require('./tag-seeds');

const sequelize = require('../config/connection');

async function seedAll() {
    await sequelize.sync({ force: true });
    console.log('-------------------');
    await seedPlayers();
    console.log('-------------------');
    await seedGames();
    console.log('-------------------');
    await seedTags();
    console.log('-------------------');
    
    process.exit(0);
};

module.exports = { seedAll };