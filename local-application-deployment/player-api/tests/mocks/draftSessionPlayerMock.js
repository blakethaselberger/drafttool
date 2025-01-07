const dbMock = require('./dbMock');

const DraftSessionPlayerMock = dbMock.define('DraftSessionPlayer', {
    id: 1, // Auto-incrementing primary key
    session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef', // Example UUID matching a draft session
    player_id: 1, // Example player ID
    drafted_by_team: 2, // Example team ID for the team that drafted the player
    draft_position: 1, // Example draft position in the session
});

module.exports = DraftSessionPlayerMock;