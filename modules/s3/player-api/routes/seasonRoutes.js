const express = require('express');
const seasonsController = require('../controllers/seasonsController');
const router = express.Router();

router.get('/players/:playerId/seasons', seasonsController.getSeasonsByPlayer);
router.post('/players/:playerId/seasons', seasonsController.createSeason);
router.put('/seasons/:id', seasonsController.updateSeason);
router.delete('/seasons/:id', seasonsController.deleteSeason);

module.exports = router;