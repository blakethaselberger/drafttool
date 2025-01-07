const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
    player_id: {
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
    position: {
        type: DataTypes.ENUM('C', 'LW', 'RW', 'D', 'G'),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(4, 1),
    },
    weight: {
        type: DataTypes.DECIMAL(4, 1),
    },
    nationality: {
        type: DataTypes.STRING,
    },
    amateur_team: {
        type: DataTypes.STRING,
    },
    draft_eligible_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'players',
    timestamps: false,
});

module.exports = Player;