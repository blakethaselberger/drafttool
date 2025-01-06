const express = require('express');
const router = express.Router();
const draftSessionController = require('../controllers/draftSessionController');

router.get('/', draftSessionController.getAllSessions);
router.post('/', draftSessionController.createDraftSession);
router.get('/:sessionId', draftSessionController.getSessionById);
router.put('/:sessionId', draftSessionController.updateDraftSession);
router.delete('/:sessionId', draftSessionController.deleteDraftSession);

module.exports = router;