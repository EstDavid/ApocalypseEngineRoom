import bcrypt from 'bcrypt';
import app from '../index';
import supertest, { Response } from 'supertest';
import User from '../model/user';
import mongoose from 'mongoose';
import { saltRounds, user1, user2 } from './test.helpers';

describe('User tests', () => {
  const request = supertest(app);

  const usersApiUrl = '/api/users';

  beforeEach(async () => {
    await User.deleteMany();
    const hashedPassword = await bcrypt.hash(user1.password, saltRounds);
    await User.create({ name: user1.username, password: hashedPassword });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  test('creating a user returns a json object', async () => {
    await request.post(`${usersApiUrl}/signup`,).send(user2)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('creating a user that already exists returns error', async () => {
    await request.post(`${usersApiUrl}/signup`,).send(user1)
      .expect(409);

    const users = await User.find();
    expect(users).toHaveLength(1);
  });

  test('should save a user to the database', async () => {
    await request.post(`${usersApiUrl}/signup`,).send(user2);

    const createdUser = await User.findOne({ name: user2.username });

    if (createdUser) {
      expect(createdUser).toHaveProperty('_id');
      expect(createdUser.name).toBe(user2.username);

      const passwordCompare = await bcrypt.compare(user2.password, createdUser.password);
      expect(passwordCompare).toBe(true);
    }
  });

  test('should get a cookie on login', async () => {
    const res: Response = await request.post(`${usersApiUrl}/login`,).send(user1);
    expect(res.status).toBe(200);

    const [cookie] = res.headers['set-cookie'];
    expect(cookie).toMatch(/sid/);
  });

  test('should handle invalid login details', async () => {
    const res = await request.post(`${usersApiUrl}/login`,).send({});
    expect(res.status).toBe(400);

    expect(res.text).toBe('Invalid input format. Both username and password must be strings.');
  });

  test('should handle invalid username', async () => {
    const res = await request.post(`${usersApiUrl}/login`,).send({ username: 'wrongname', password: user1.password });
    expect(res.status).toBe(401);

    expect(res.text).toBe('Invalid username or password. Please check and try again.');
  });

  test('should handle invalid password', async () => {
    const res = await request.post(`${usersApiUrl}/login`,).send({ username: user1.username, password: 'wrongpassword' });
    expect(res.status).toBe(401);

    expect(res.text).toBe('Invalid username or password. Please check and try again.');
  });

  test('should handle logout', async () => {
    await request.post(`${usersApiUrl}/login`,).send(user1);

    const res2: Response = await request.post(`${usersApiUrl}/logout`);
    expect(res2.status).toBe(200);
    expect(res2.text).toBe('cookie cleared');
  });
});