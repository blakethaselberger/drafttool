const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DraftSessionPlayer = sequelize.define('DraftSessionPlayer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    session_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'draft_sessions',
            key: 'session_id',
        },
        onDelete: 'CASCADE',
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
    drafted_by_team: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'teams',
            key: 'team_id',
        },
    },
    draft_position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'draft_session_players',
    timestamps: false,
});

module.exports = DraftSessionPlayer;