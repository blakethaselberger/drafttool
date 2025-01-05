const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shoots: { 
        type: DataTypes.ENUM('Left', 'Right'), 
        allowNull: false,
    },
    nation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    place_of_birth: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    height: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'players',
});

module.exports = Player;