const seedPlayers = require('./player-seeds');
const seedGames = require('./game-seeds');
const seedTags = require('./tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
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

seedAll();

seedAll().catch(e => console.log("There's error during seeds", e));