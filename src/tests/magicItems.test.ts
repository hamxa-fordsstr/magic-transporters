import { randomUUID } from 'crypto';
import request from 'supertest';
import app from '../index';

describe('Magic Items API', () => {
  it('should fetch a magic item by ID', async () => {
    const response = await request(app).get('/api/magicitems/6735f2508c64bd5db7edd7f7');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  it('should add a new magic item', async () => {
    const newItem = { name: `testItem-${randomUUID()}`, weight: 10 };
    const response = await request(app)
      .post('/api/magicitems/add')
      .send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newItem.name);
  });
});
