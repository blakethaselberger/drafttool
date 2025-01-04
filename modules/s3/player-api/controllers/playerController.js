const Player = require('../models/player');

exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.findAll();
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);
        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const [updated] = await Player.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedPlayer = await Player.findByPk(req.params.id);
            res.status(200).json(updatedPlayer);
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const deleted = await Player.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
