const express = require('express');
const DraftPickMock = require('../DraftPickMock');
const router = express.Router();

// Get all draft picks for a session
router.get('/session/:sessionId', (req, res) => {
    const picks = [DraftPickMock.build({
        pick_id: 1,
        team_id: 1,
        round: 1,
        overall_pick: 1,
        year: 2025,
    })];
    res.json(picks);
});

// Create a new draft pick
router.post('/session/:sessionId', (req, res) => {
    const newPick = DraftPickMock.build(req.body);
    res.status(201).json(newPick);
});

module.exports = router;