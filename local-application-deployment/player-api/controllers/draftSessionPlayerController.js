const DraftSessionPlayer = require('../models/draftSessionPlayer');

// Get all players in a specific draft session
exports.getPlayersBySession = async (req, res) => {
    try {
        const { sessionId } = req.params; // Extract sessionId from the route
        const players = await DraftSessionPlayer.findAll({ where: { session_id: sessionId } });
        res.json(players);
    } catch (error) {
        console.error('Error fetching players for draft session:', error);
        res.status(500).json({ error: 'Failed to fetch players for draft session' });
    }
};

// Add a player to a draft session
exports.addPlayerToSession = async (req, res) => {
    try {
        const { sessionId } = req.params; // Extract sessionId from the route
        const { player_id, drafted_by_team, draft_position } = req.body;

        // Create a new entry in the draft_session_players table
        const newPlayer = await DraftSessionPlayer.create({
            session_id: sessionId, 
            player_id,
            drafted_by_team,
            draft_position,
        });

        res.status(201).json(newPlayer);
    } catch (error) {
        console.error('Error adding player to draft session:', error);
        res.status(400).json({ error: 'Failed to add player to draft session' });
    }
};

// Remove a player from a draft session
exports.removePlayerFromSession = async (req, res) => {
    try {
        const { id } = req.params; // Extract player entry ID from the route
        const deleted = await DraftSessionPlayer.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Player removed from draft session' });
        } else {
            res.status(404).json({ error: 'Player not found in draft session' });
        }
    } catch (error) {
        console.error('Error removing player from draft session:', error);
        res.status(500).json({ error: 'Failed to remove player from draft session' });
    }
};