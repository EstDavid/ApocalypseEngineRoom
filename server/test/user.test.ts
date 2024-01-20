import app from '../index';
import supertest from 'supertest';
import User from '../model/user';
import mongoose from 'mongoose';

describe('Integration tests', () => {
  const request = supertest(app);
  const user = { username: 'Tim', password: 'safjnmadfjnaf363' };

  beforeEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  it('should save a user to the database', async () => {

    const res = await request.post('/api/users/signup',).send(user);
    expect(res.status).toBe(200);

    const createdUser = await User.findOne({ name: user.username });
    if (createdUser) {

      expect(createdUser.name).toBe(user.username);
    }
  });
});