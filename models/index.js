const Player = require('./Player');
const Game = require('./Game');
const Tag = require('./Tag');
const PlayerTag = require('./PlayerTag');

Tag.belongsTo(Player, {
    foreignKey: 'player_id'
});

Player.hasMany(Tag, {
    foreignKey: 'player_id'
});
Game.belongsTo(Player, {
    foreignKey: 'player_id'
});

module.exports = {
    Player,
    Game,
    Tag,
    PlayerTag
};