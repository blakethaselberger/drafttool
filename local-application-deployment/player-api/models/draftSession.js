const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DraftSession = sequelize.define('DraftSession', {
    session_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    current_pick: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    total_picks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'draft_sessions',
    timestamps: false,
});

module.exports = DraftSession;