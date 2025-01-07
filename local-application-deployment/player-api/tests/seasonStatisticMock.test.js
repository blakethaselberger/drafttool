const request = require('supertest');
const app = require('../app');

describe('Season Statistics API Mock Tests', () => {
    it('should fetch all season statistics for a player', async () => {
        const response = await request(app).get('/api/season-statistics/player/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    player_id: 1,
                    season_year: '2023-2024',
                    team: 'Regina Pats',
                    league: 'WHL',
                    games_played: 57,
                    goals: 50,
                    assists: 40,
                    points: 90,
                    penalty_minutes: 20,
                    plus_minus: 25,
                }),
            ])
        );
    });

    it('should create new season statistics for a player', async () => {
        const newStat = {
            season_year: '2023-2024',
            team: 'Regina Pats',
            league: 'WHL',
            games_played: 57,
            goals: 50,
            assists: 40,
            points: 90,
            penalty_minutes: 20,
            plus_minus: 25,
        };
        const response = await request(app)
            .post('/api/season-statistics/player/1')
            .send(newStat);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                player_id: 1, // Inferred from the route
                ...newStat,
            })
        );
    });
});