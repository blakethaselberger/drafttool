const request = require('supertest');
const app = require('../app');

describe('Draft Pick API Mock Tests', () => {
    it('should fetch all draft picks for a team', async () => {
        const response = await request(app).get('/api/draft-picks/team/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    pick_id: 1, // Matches the primary key
                    team_id: 1, // Matches the team ID
                    round: 1, // Matches the draft round
                    overall_pick: 1, // Matches the overall pick
                    year: 2025, // Matches the draft year
                }),
            ])
        );
    });

    it('should create a new draft pick', async () => {
        const newPick = {
            team_id: 1,
            round: 1,
            overall_pick: 2,
            year: 2025,
        };
        const response = await request(app).post('/api/draft-picks').send(newPick);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newPick));
    });
});