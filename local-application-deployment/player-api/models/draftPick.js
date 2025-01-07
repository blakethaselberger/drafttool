const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DraftPick = sequelize.define('DraftPick', {
    pick_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'team_id',
        },
    },
    round: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    overall_pick: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'draft_picks',
    timestamps: false,
});

module.exports = DraftPick;