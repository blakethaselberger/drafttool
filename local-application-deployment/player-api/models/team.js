const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    arena: {
        type: DataTypes.STRING,
    },
    conference: {
        type: DataTypes.ENUM('Eastern', 'Western'),
        allowNull: false,
    },
    division: {
        type: DataTypes.ENUM('Atlantic', 'Metropolitan', 'Central', 'Pacific'),
        allowNull: false,
    },
}, {
    tableName: 'teams',
    timestamps: false,
});

module.exports = Team;