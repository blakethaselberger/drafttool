const Player = require('../models/player');

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.findAll();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch players' });
    }
};

exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.json(player);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create player' });
    }
};

exports.getPlayerById = async (req, res) => {
    try {
        const { playerId } = req.params;
        const player = await Player.findByPk(playerId);
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player' });
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const [updated] = await Player.update(req.body, { where: { player_id: playerId } });
        if (updated) {
            const updatedPlayer = await Player.findByPk(playerId);
            res.json(updatedPlayer);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update player' });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const deleted = await Player.destroy({ where: { player_id: playerId } });
        if (deleted) {
            res.json({ message: 'Player deleted' });
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete player' });
    }
};