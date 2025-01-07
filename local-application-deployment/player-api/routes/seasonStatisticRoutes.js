const express = require('express');
const router = express.Router();
const seasonStatisticController = require('../controllers/seasonStatisticController');

router.get('/player/:playerId', seasonStatisticController.getSeasonsByPlayer);
router.post('/player/:playerId', seasonStatisticController.createSeasonStatistic);
router.put('/:seasonId', seasonStatisticController.updateSeasonStatistic);
router.delete('/:seasonId', seasonStatisticController.deleteSeasonStatistic);

module.exports = router;