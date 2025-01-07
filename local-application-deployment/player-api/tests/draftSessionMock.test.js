const request = require('supertest');
const app = require('../app');

describe('Draft Session API Mock Tests', () => {
    it('should fetch all draft sessions', async () => {
        const response = await request(app).get('/api/draft-sessions');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    session_id: expect.any(String), // UUID
                    current_pick: 1,
                    total_picks: 10,
                    created_at: expect.any(String), // Timestamp
                }),
            ])
        );
    });

    it('should create a new draft session', async () => {
        const newSession = {
            current_pick: 1,
            total_picks: 10,
        };
        const response = await request(app).post('/api/draft-sessions').send(newSession);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                session_id: expect.any(String), // UUID
                ...newSession,
                created_at: expect.any(String), // Timestamp
            })
        );
    });
});