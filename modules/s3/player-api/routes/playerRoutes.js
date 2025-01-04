const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.post('/players', playerController.createPlayer);
router.get('/players', playerController.getAllPlayers);
router.get('/players/:id', playerController.getPlayerById);
router.put('/players/:id', playerController.updatePlayer);
router.delete('/players/:id', playerController.deletePlayer);

module.exports = router;
