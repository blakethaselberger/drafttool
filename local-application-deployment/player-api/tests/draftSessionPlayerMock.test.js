const request = require('supertest');
const app = require('../app');

describe('Draft Session Player API Mock Tests', () => {
    it('should fetch all players in a draft session', async () => {
        const response = await request(app).get('/api/draft-session-players/session/a1b2c3d4-e5f6-7890-abcd-1234567890ef');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
                    player_id: 1,
                    drafted_by_team: 2,
                    draft_position: 1,
                }),
            ])
        );
    });

    it('should add a player to a draft session', async () => {
        const newDraftSessionPlayer = {
            session_id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
            player_id: 2,
            drafted_by_team: 3,
            draft_position: 2,
        };
        const response = await request(app).post('/api/draft-session-players').send(newDraftSessionPlayer);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newDraftSessionPlayer));
    });

    it('should delete a player from a draft session', async () => {
        const response = await request(app).delete('/api/draft-session-players/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({ message: 'Draft session player deleted successfully' })
        );
    });
});