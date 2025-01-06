const SeasonStatistic = require('../models/seasonStatistic');

// Get all season statistics for a specific player
exports.getSeasonsByPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const stats = await SeasonStatistic.findAll({ where: { player_id: playerId } });
        res.json(stats);
    } catch (error) {
        console.error('Error fetching season statistics:', error);
        res.status(500).json({ error: 'Failed to fetch season statistics' });
    }
};

// Create a new season statistic for a player
exports.createSeasonStatistic = async (req, res) => {
    try {
        const { playerId } = req.params;
        const newStat = { ...req.body, player_id: playerId };
        const stat = await SeasonStatistic.create(newStat);
        res.json(stat);
    } catch (error) {
        console.error('Error creating season statistic:', error);
        res.status(400).json({ error: 'Failed to create season statistic' });
    }
};

// Update an existing season statistic
exports.updateSeasonStatistic = async (req, res) => {
    try {
        const { seasonId } = req.params;
        const [updated] = await SeasonStatistic.update(req.body, { where: { season_id: seasonId } });
        if (updated) {
            const updatedStat = await SeasonStatistic.findByPk(seasonId);
            res.json(updatedStat);
        } else {
            res.status(404).json({ error: 'Season statistic not found' });
        }
    } catch (error) {
        console.error('Error updating season statistic:', error);
        res.status(400).json({ error: 'Failed to update season statistic' });
    }
};

// Delete a season statistic
exports.deleteSeasonStatistic = async (req, res) => {
    try {
        const { seasonId } = req.params;
        const deleted = await SeasonStatistic.destroy({ where: { season_id: seasonId } });
        if (deleted) {
            res.json({ message: 'Season statistic deleted' });
        } else {
            res.status(404).json({ error: 'Season statistic not found' });
        }
    } catch (error) {
        console.error('Error deleting season statistic:', error);
        res.status(500).json({ error: 'Failed to delete season statistic' });
    }
};

// Get a single season statistic by ID
exports.getSeasonStatisticById = async (req, res) => {
    try {
        const { seasonId } = req.params;
        const stat = await SeasonStatistic.findByPk(seasonId);
        if (stat) {
            res.json(stat);
        } else {
            res.status(404).json({ error: 'Season statistic not found' });
        }
    } catch (error) {
        console.error('Error fetching season statistic by ID:', error);
        res.status(500).json({ error: 'Failed to fetch season statistic' });
    }
};