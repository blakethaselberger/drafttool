const DraftSession = require('../models/draftSession');

// Get all draft sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await DraftSession.findAll();
        res.json(sessions);
    } catch (error) {
        console.error('Error fetching draft sessions:', error);
        res.status(500).json({ error: 'Failed to fetch draft sessions' });
    }
};

// Create a new draft session
exports.createDraftSession = async (req, res) => {
    try {
        const session = await DraftSession.create(req.body);
        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating draft session:', error);
        res.status(400).json({ error: 'Failed to create draft session' });
    }
};

// Get a single draft session by ID
exports.getSessionById = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await DraftSession.findByPk(sessionId);
        if (session) {
            res.json(session);
        } else {
            res.status(404).json({ error: 'Draft session not found' });
        }
    } catch (error) {
        console.error('Error fetching draft session:', error);
        res.status(500).json({ error: 'Failed to fetch draft session' });
    }
};

// Update a draft session
exports.updateDraftSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const [updated] = await DraftSession.update(req.body, { where: { session_id: sessionId } });
        if (updated) {
            const updatedSession = await DraftSession.findByPk(sessionId);
            res.json(updatedSession);
        } else {
            res.status(404).json({ error: 'Draft session not found' });
        }
    } catch (error) {
        console.error('Error updating draft session:', error);
        res.status(400).json({ error: 'Failed to update draft session' });
    }
};

// Delete a draft session
exports.deleteDraftSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const deleted = await DraftSession.destroy({ where: { session_id: sessionId } });
        if (deleted) {
            res.json({ message: 'Draft session deleted' });
        } else {
            res.status(404).json({ error: 'Draft session not found' });
        }
    } catch (error) {
        console.error('Error deleting draft session:', error);
        res.status(500).json({ error: 'Failed to delete draft session' });
    }
};