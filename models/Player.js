const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create playeer model

class Player extends Model{}

//define table columns and configurations
Player.init(
    {
        // table column definitions here
        // define id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        }
    },
    {
        // table configurations 

        //pass in imported sequelize connection (direct connection to our database)
        sequelize,
        // dont auto create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize database names
        freezeTableName: true,
        // use underscores instead of camel casing
        underscored: true,
        // make it so model name stays lowercase in db
        modelName: 'player'
    }
);

module.exports = Player;