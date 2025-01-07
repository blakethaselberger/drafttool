const dbMock = require('./dbMock');

const SeasonStatisticMock = dbMock.define('SeasonStatistic', {
    season_id: 1, // Matches the primary key in the model
    player_id: 1, // References a player
    season_year: '2023-2024', // Example season year
    team: 'Regina Pats', // Example team name
    league: 'WHL', // Example league name
    games_played: 57, // Example games played
    goals: 50, // Example goals
    assists: 40, // Example assists
    points: 90, // Example points
    penalty_minutes: 20, // Example penalty minutes
    plus_minus: 25, // Example plus-minus
});

module.exports = SeasonStatisticMock;