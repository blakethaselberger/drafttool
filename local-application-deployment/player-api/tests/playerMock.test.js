const request = require('supertest');
const app = require('../app');

describe('Player API Mock Tests', () => {
    it('should fetch all players', async () => {
        const response = await request(app).get('/api/players');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    first_name: 'Connor',
                    last_name: 'Bedard',
                    position: 'C',
                    age: 18,
                    draft_eligible_year: 2023,
                }),
            ])
        );
    });

    it('should create a new player', async () => {
        const newPlayer = {
            first_name: 'Adam',
            last_name: 'Fantilli',
            position: 'C',
            age: 18,
            height: 6.2,
            weight: 195,
            nationality: 'Canada',
            amateur_team: 'University of Michigan',
            draft_eligible_year: 2023,
        };
        const response = await request(app).post('/api/players').send(newPlayer);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newPlayer));
    });
});