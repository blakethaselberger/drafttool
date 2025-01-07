const dbMock = require('./dbMock');

const DraftSessionMock = dbMock.define('DraftSession', {
    session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef', // Example UUID
    current_pick: 1,
    total_picks: 31, // Example total number of picks
    created_at: new Date(), // Example creation time
});

module.exports = DraftSessionMock;