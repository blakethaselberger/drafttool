const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const Season = sequelize.define('Season', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'players', // Ensure this matches the actual Players table name
            key: 'id',        // Foreign key references the primary key in Players table
        },
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{2}-\d{2}$/, // Ensures the format is 'YY-YY' (e.g., '19-20')
        },
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    league: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    games_played: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    goals: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    assists: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    penalty_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    plus_minus: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: false,
    tableName: 'seasons', // Matches the database table name
});

module.exports = Season;