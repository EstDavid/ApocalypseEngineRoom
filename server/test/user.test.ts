import bcrypt from 'bcrypt';
import app from '../index';
import supertest, { Response } from 'supertest';
import User from '../model/user';
import mongoose from 'mongoose';

describe('Integration tests', () => {
  const request = supertest(app);
  const user = { username: 'Tim', password: 'safjnmadfjnaf363' };

  const usersApiUrl = '/api/users';

  beforeEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  it('should save a user to the database', async () => {
    const res = await request.post(`${usersApiUrl}/signup`,).send(user);
    expect(res.status).toBe(200);

    const createdUser = await User.findOne({ name: user.username });
    if (createdUser) {

      expect(createdUser.name).toBe(user.username);

      const passwordCompare = await bcrypt.compare(user.password, createdUser.password);
      expect(passwordCompare).toBe(true);
    }
  });

  it('should get a user from database', async () => {
    await User.create({ name: user.username, password: user.password });

    const res: Response = await request.post(`${usersApiUrl}/login`,).send(user);
    expect(res.status).toBe(200);

    const [cookie] = res.headers['set-cookie'];
    expect(cookie).toMatch(/connect.sid/);
  });

  it('should handle invalid login details', async () => {
    await User.create({ name: user.username, password: user.password });

    const res = await request.post(`${usersApiUrl}/login`,).send({});
    expect(res.status).toBe(400);

    expect(res.text).toBe('Wrong connection details');
  });
});