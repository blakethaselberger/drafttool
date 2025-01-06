const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SeasonStatistic = sequelize.define('SeasonStatistic', {
    season_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'players',
            key: 'player_id',
        },
        onDelete: 'CASCADE',
    },
    season_year: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'season_statistics',
    timestamps: false,
});

module.exports = SeasonStatistic;