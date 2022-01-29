const Player = require('./Player');
const Game = require('./Game');
const Tag = require('./Tag');
const PlayerTag = require('./PlayerTag');

// Products belongToMany Tags (through ProductTag)
Player.belongsToMany(Tag, {
    through: PlayerTag,
    foreignKey: 'Player_id'
});
// Tags belongToMany Players (through PlayerTag)
Tag.belongsToMany(Player, {
    through: PlayerTag,
    foreignKey: 'tag_id'
});


module.exports = {
    Player,
    Game,
    Tag,
    PlayerTag
};