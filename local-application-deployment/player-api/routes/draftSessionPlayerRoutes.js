const express = require('express');
const router = express.Router();
const draftSessionPlayerController = require('../controllers/draftSessionPlayerController');

router.get('/session/:sessionId', draftSessionPlayerController.getPlayersBySession);
router.post('/session/:sessionId', draftSessionPlayerController.addPlayerToSession);
router.delete('/:id', draftSessionPlayerController.removePlayerFromSession);

module.exports = router;