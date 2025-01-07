const express = require('express');
const router = express.Router();
const draftPickController = require('../controllers/draftPickController');

router.get('/', draftPickController.getAllDraftPicks);
router.post('/', draftPickController.createDraftPick);
router.get('/:pickId', draftPickController.getDraftPickById);
router.put('/:pickId', draftPickController.updateDraftPick);
router.delete('/:pickId', draftPickController.deleteDraftPick);

module.exports = router;