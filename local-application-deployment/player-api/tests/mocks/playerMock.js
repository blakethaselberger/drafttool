const dbMock = require('./dbMock');

const PlayerMock = dbMock.define('Player', {
    player_id: 1, // Matches the primary key in the Player model
    first_name: 'Connor',
    last_name: 'Bedard',
    position: 'C', // Must be one of the ENUM values ('C', 'LW', 'RW', 'D', 'G')
    age: 18,
    height: 5.10, // Example height in decimal format
    weight: 185, // Example weight in decimal format
    nationality: 'Canada', // Example nationality
    amateur_team: 'Regina Pats', // Example amateur team
    draft_eligible_year: 2023, // Example draft eligibility year
});

module.exports = PlayerMock;