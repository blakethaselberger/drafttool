const express = require('express');
const router = express.Router();
const draftSessionPlayerController = require('../controllers/draftSessionPlayerController');

// Get all players in a specific draft session
router.get('/session/:sessionId', draftSessionPlayerController.getPlayersBySession);

// Add a player to a specific draft session
router.post('/session/:sessionId', draftSessionPlayerController.addPlayerToSession);

// Remove a player from a draft session by entry ID
router.delete('/:id', draftSessionPlayerController.removePlayerFromSession);

module.exports = router;