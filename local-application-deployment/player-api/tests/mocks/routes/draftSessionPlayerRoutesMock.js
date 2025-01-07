const express = require('express');
const DraftSessionPlayerMock = require('../DraftSessionPlayerMock');
const router = express.Router();

// Get all players in a draft session
router.get('/session/:sessionId', (req, res) => {
    const players = [DraftSessionPlayerMock.build({
        id: 1,
        session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        player_id: 1,
        drafted_by_team: 2,
        draft_position: 1,
    })];
    res.json(players);
});

// Add a player to a draft session
router.post('/session/:sessionId', (req, res) => {
    const newPlayer = DraftSessionPlayerMock.build(req.body);
    res.status(201).json(newPlayer);
});

module.exports = router;