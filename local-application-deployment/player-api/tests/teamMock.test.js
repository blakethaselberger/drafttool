const request = require('supertest');
const app = require('../app');

describe('Team API Mock Tests', () => {
    it('should fetch all teams', async () => {
        const response = await request(app).get('/api/teams');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Anaheim Ducks',
                    abbreviation: 'ANA',
                    city: 'Anaheim',
                    state: 'California',
                    arena: 'Honda Center',
                    conference: 'Western',
                    division: 'Pacific',
                }),
            ])
        );
    });

    it('should create a new team', async () => {
        const newTeam = {
            name: 'Seattle Kraken',
            abbreviation: 'SEA',
            city: 'Seattle',
            state: 'Washington',
            arena: 'Climate Pledge Arena',
            conference: 'Western',
            division: 'Pacific',
        };
        const response = await request(app).post('/api/teams').send(newTeam);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newTeam));
    });
});