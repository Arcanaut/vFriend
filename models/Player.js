const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create playeer model

class Player extends Model{
    // set up method to run on users instance data to check plaintext pw with hashed pw
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        // password hashing hook, beforecreating player, async because hashing is cpu intensive
        hooks: {
            async beforeCreate(newPlayerData) {
                newPlayerData.password = await bcrypt.hash(newPlayerData.password, 10);
                return newPlayerData;
            }, 

            async beforeUpdate(updatedPlayerData) {
                updatedPlayerData.password = await bcrypt.hash(updatedPlayerData.password, 10);
                return updatedPlayerData;
            }
        },
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