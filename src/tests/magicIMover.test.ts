import { randomUUID } from 'crypto';
import request from 'supertest';
import app from '../index';

describe('Magic Movers API', () => {

  it('should add a new Magic Mover', async () => {
    let newMover = { 
      name: `TestMover-${randomUUID()}`, 
      weightLimit: 100 
    };
    const response = await request(app)
      .post('/api/magicmovers/add')
      .send(newMover);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newMover.name);
    expect(response.body.weightLimit).toBe(newMover.weightLimit);
  });

  it('should load items into a Magic Mover', async () => {
    const itemNames = ['item1', 'item2'];

    const response = await request(app)
      .post('/api/magicmovers/load/6735cfe3f47561c60dd8ea47')
      .send({ itemNames });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Items loaded successfully');
    expect(response.body.mover.state).toBe('loading');
  });

  it('should start a mission for a Magic Mover', async () => {
    const response = await request(app)
      .post('/api/magicmovers/start-mission/6735cfe3f47561c60dd8ea47');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Mission started');
    expect(response.body.mover.state).toBe('on-mission');
  });

  it('should end a mission for a Magic Mover', async () => {
    const response = await request(app)
      .post('/api/magicmovers/end-mission/6735cfe3f47561c60dd8ea47');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Mission ended and items unloaded');
    expect(response.body.mover.state).toBe('resting');
  });

  it('should retrieve the leaderboard of top Magic Movers', async () => {
    const response = await request(app).get('/api/magicmovers/leaderboard');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('missionCount');
  });
});