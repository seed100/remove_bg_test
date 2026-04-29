import request from 'supertest';
import app from '../src/app';

describe('API Health & Error Handling', () => {
  it('should return 200 and status ok for GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('should return 404 and error "Not Found" for GET /invalid-route', async () => {
    const res = await request(app).get('/invalid-route');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Not Found' });
  });
});
