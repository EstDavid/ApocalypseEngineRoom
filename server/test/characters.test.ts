import bcrypt from 'bcrypt';
import app from '../index';
import supertest from 'supertest';
import User from '../model/user';
import Character from '../model/character';
import mongoose from 'mongoose';
import { character1, character2, saltRounds, user1, user2 } from './test.helpers';
import { ICharacter, IUser } from '../types';

let cookie: string;
let user: IUser | null;

describe('User tests', () => {
  const request = supertest(app);

  const usersApiUrl = '/api/users';
  const charactersApiUrl = '/api/characters';

  beforeEach(async () => {
    await User.deleteMany();
    await Character.deleteMany();
    // const hashedPassword = await bcrypt.hash(user1.password, saltRounds);
    // await User.create({ name: user1.username, password: hashedPassword });
    const res = await request
      .post(`${usersApiUrl}/signup`,)
      .send(user1);

    cookie = res.headers['set-cookie'];

    user = await User.findOne();

    await request
      .post(`${charactersApiUrl}/`)
      .set('Cookie', cookie)
      .send(character1);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.close();
  });

  test('creating a character returns a json object', async () => {
    await request
      .post(`${charactersApiUrl}/`,)
      .set('Cookie', cookie)
      .send(character2)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('creates a character', async () => {
    const res = await request
      .post(`${charactersApiUrl}/`,)
      .set('Cookie', cookie)
      .send(character2);

    const characterId = res.body;

    const createdCharacter = await Character.findById(characterId);
    if (createdCharacter && user) {
      expect(createdCharacter).toHaveProperty('_id');
      expect(createdCharacter.name).toBe(character2.name);
      expect(createdCharacter.owner).toBe(user._id.toString());
      expect(createdCharacter.playbook).toBe(character2.playbook);
    } else {
      throw new Error('Character was not created');
    }
  });
});