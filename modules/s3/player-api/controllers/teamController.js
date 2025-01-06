const Team = require('../models/team');

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        res.json(team);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
};

exports.getTeamById = async (req, res) => {
    try {
        const { teamId } = req.params;
        const team = await Team.findByPk(teamId);
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const [updated] = await Team.update(req.body, { where: { team_id: teamId } });
        if (updated) {
            const updatedTeam = await Team.findByPk(teamId);
            res.json(updatedTeam);
        } else {
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const deleted = await Team.destroy({ where: { team_id: teamId } });
        if (deleted) {
            res.json({ message: 'Team deleted' });
        } else {
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
};