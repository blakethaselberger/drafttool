const express = require('express');
const PlayerMock = require('../PlayerMock');
const router = express.Router();

// Get all players
router.get('/', (req, res) => {
    const players = [
        PlayerMock.build({
            player_id: 1,
            first_name: 'Connor',
            last_name: 'Bedard',
            position: 'C',
            age: 18,
            height: 5.10,
            weight: 185,
            nationality: 'Canada',
            amateur_team: 'Regina Pats',
            draft_eligible_year: 2023,
        }),
        PlayerMock.build({
            player_id: 2,
            first_name: 'Adam',
            last_name: 'Fantilli',
            position: 'C',
            age: 19,
            height: 6.0,
            weight: 190,
            nationality: 'Canada',
            amateur_team: 'University of Michigan',
            draft_eligible_year: 2023,
        }),
        PlayerMock.build({
            player_id: 3,
            first_name: 'Leo',
            last_name: 'Carlsson',
            position: 'C',
            age: 18,
            height: 6.3,
            weight: 198,
            nationality: 'Sweden',
            amateur_team: 'Orebro HK',
            draft_eligible_year: 2023,
        }),
    ];
    res.json(players);
});

// Create a new player
router.post('/', (req, res) => {
    const newPlayer = PlayerMock.build(req.body);
    res.status(201).json(newPlayer);
});

module.exports = router;