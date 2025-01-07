const express = require('express');
const TeamMock = require('../TeamMock');
const router = express.Router();

// Get all teams
router.get('/', (req, res) => {
    const teams = [TeamMock.build({
        team_id: 1,
        name: 'Anaheim Ducks',
        abbreviation: 'ANA',
        city: 'Anaheim',
        state: 'California',
        arena: 'Honda Center',
        conference: 'Western',
        division: 'Pacific',
    })];
    res.json(teams);
});

// Create a new team
router.post('/', (req, res) => {
    const newTeam = TeamMock.build(req.body);
    res.status(201).json(newTeam);
});

module.exports = router;