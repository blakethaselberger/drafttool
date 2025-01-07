const DraftPick = require('../models/draftPick');

exports.getAllDraftPicks = async (req, res) => {
    try {
        const picks = await DraftPick.findAll();
        res.json(picks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch draft picks' });
    }
};

exports.createDraftPick = async (req, res) => {
    try {
        const pick = await DraftPick.create(req.body);
        res.json(pick);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create draft pick' });
    }
};

exports.getDraftPickById = async (req, res) => {
    try {
        const { pickId } = req.params;
        const pick = await DraftPick.findByPk(pickId);
        if (pick) {
            res.json(pick);
        } else {
            res.status(404).json({ error: 'Draft pick not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch draft pick' });
    }
};

exports.updateDraftPick = async (req, res) => {
    try {
        const { pickId } = req.params;
        const [updated] = await DraftPick.update(req.body, { where: { pick_id: pickId } });
        if (updated) {
            const updatedPick = await DraftPick.findByPk(pickId);
            res.json(updatedPick);
        } else {
            res.status(404).json({ error: 'Draft pick not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update draft pick' });
    }
};

exports.deleteDraftPick = async (req, res) => {
    try {
        const { pickId } = req.params;
        const deleted = await DraftPick.destroy({ where: { pick_id: pickId } });
        if (deleted) {
            res.json({ message: 'Draft pick deleted' });
        } else {
            res.status(404).json({ error: 'Draft pick not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete draft pick' });
    }
};