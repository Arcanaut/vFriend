const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PlayerTag extends Model {}

PlayerTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        player_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Player',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

module.exports = PlayerTag;
