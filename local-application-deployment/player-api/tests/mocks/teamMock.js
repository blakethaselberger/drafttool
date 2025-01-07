const dbMock = require('./dbMock');

const TeamMock = dbMock.define('Team', {
    team_id: 1, // Matches the primary key in the Team model
    name: 'Anaheim Ducks', // Example team name
    abbreviation: 'ANA', // Example abbreviation
    city: 'Anaheim', // Example city
    state: 'California', // Example state
    arena: 'Honda Center', // Example arena
    conference: 'Western', // Must be either 'Eastern' or 'Western'
    division: 'Pacific', // Must be one of 'Atlantic', 'Metropolitan', 'Central', 'Pacific'
});

module.exports = TeamMock;