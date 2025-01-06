const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getAllPlayers);
router.post('/', playerController.createPlayer);
router.get('/:playerId', playerController.getPlayerById);
router.put('/:playerId', playerController.updatePlayer);
router.delete('/:playerId', playerController.deletePlayer);

module.exports = router;