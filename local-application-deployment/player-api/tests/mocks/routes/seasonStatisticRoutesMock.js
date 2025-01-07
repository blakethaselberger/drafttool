const express = require('express');
const SeasonStatisticMock = require('../SeasonStatisticMock');
const router = express.Router();

// Get all season statistics for a player
router.get('/player/:playerId', (req, res) => {
    const stats = [SeasonStatisticMock.build({
        season_id: 1,
        player_id: 1,
        season_year: '2023-2024',
        team: 'Regina Pats',
        league: 'WHL',
        games_played: 57,
        goals: 50,
        assists: 40,
        points: 90,
        penalty_minutes: 20,
        plus_minus: 25,
    })];
    res.json(stats);
});

// Create new season statistics
router.post('/player/:playerId', (req, res) => {
    const newStat = SeasonStatisticMock.build(req.body);
    res.status(201).json(newStat);
});

module.exports = router;