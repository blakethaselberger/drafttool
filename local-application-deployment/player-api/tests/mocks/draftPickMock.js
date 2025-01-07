const dbMock = require('./dbMock');

const DraftPickMock = dbMock.define('DraftPick', {
    pick_id: 1, // Example auto-incrementing primary key
    team_id: 1, // Example team ID
    round: 1, // Example round of the draft
    overall_pick: 1, // Example overall pick number
    year: 2025, // Example draft year
});

module.exports = DraftPickMock;