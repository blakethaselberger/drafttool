const express = require('express');
const DraftSessionMock = require('../DraftSessionMock');
const router = express.Router();

// Get all draft sessions
router.get('/', (req, res) => {
    const sessions = [DraftSessionMock.build({
        session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        current_pick: 1,
        total_picks: 10,
        created_at: new Date(),
    })];
    res.json(sessions);
});

// Create a new draft session
router.post('/', (req, res) => {
    const newSession = DraftSessionMock.build(req.body);
    res.status(201).json(newSession);
});

module.exports = router;