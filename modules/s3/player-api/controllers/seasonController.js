const Season = require('../models/season');

// Get all seasons for a specific player
exports.getSeasonsByPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const seasons = await Season.findAll({ where: { player_id: playerId } });
        res.json(seasons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch seasons' });
    }
};

// Create a new season for a player
exports.createSeason = async (req, res) => {
    try {
        const { playerId } = req.params;
        const newSeason = { ...req.body, player_id: playerId };
        const season = await Season.create(newSeason);
        res.json(season);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create season' });
    }
};

// Update an existing season
exports.updateSeason = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Season.update(req.body, { where: { id } });
        if (updated) {
            const updatedSeason = await Season.findOne({ where: { id } });
            res.json(updatedSeason);
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update season' });
    }
};

// Delete a season
exports.deleteSeason = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Season.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Season deleted' });
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete season' });
    }
};