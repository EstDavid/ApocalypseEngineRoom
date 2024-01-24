import app from '../index';
import supertest from 'supertest';
import User from '../model/user';
import Character from '../model/character';
import mongoose from 'mongoose';
import { character1, character2, user1 } from './test.helpers';
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
      .send(character2)
      .expect(201);

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

  test('gets all the characters from a user', async () => {
    const res = await request
      .get(`${charactersApiUrl}/`)
      .set('Cookie', cookie)
      .expect(200);

    const characterId = res.body;

    const createdCharacter = await Character.findById(characterId);
    if (createdCharacter && user) {
      expect(createdCharacter).toHaveProperty('_id');
      expect(createdCharacter.name).toBe(character1.name);
      expect(createdCharacter.owner).toBe(user._id.toString());
      expect(createdCharacter.playbook).toBe(character1.playbook);
    } else {
      throw new Error('Character was not created');
    }
  });

  test('gets a character by Id', async () => {
    if (user) {
      const character = await Character.findOne({ owner: user._id });
      if (character) {
        const res = await request
          .get(`${charactersApiUrl}/${character._id}`)
          .set('Cookie', cookie)
          .expect(200);

        const fetchedCharacter: ICharacter = res.body;
        if (fetchedCharacter) {
          expect(fetchedCharacter).toHaveProperty('_id');
          expect(fetchedCharacter.name).toBe(character1.name);
          expect(fetchedCharacter.owner).toBe(user._id.toString());
          expect(fetchedCharacter.playbook).toBe(character1.playbook);
        } else {
          throw new Error('Character was not created');
        }
      }
    }
  });

  test('updates a character', async () => {
    const newName = 'Big Elf';
    if (user) {
      const character = await Character.findOne({ owner: user._id });
      if (character) {
        const newData = {
          updatedField: 'name',
          newVal: newName
        };
        const res = await request
          .post(`${charactersApiUrl}/${character._id}`)
          .set('Cookie', cookie)
          .send(newData)
          .expect(201);

        const fetchedCharacter: ICharacter = res.body;
        if (fetchedCharacter) {
          expect(fetchedCharacter).toHaveProperty('_id');
          expect(fetchedCharacter.name).toBe(newName);
          expect(fetchedCharacter.owner).toBe(user._id.toString());
          expect(fetchedCharacter.playbook).toBe(character1.playbook);
        } else {
          throw new Error('Character was not updateds');
        }
      }
    }
  });

  test('deletes a character', async () => {
    if (user) {
      const character = await Character.findOne({ owner: user._id });
      if (character) {
        await request
          .delete(`${charactersApiUrl}/${character._id}`)
          .set('Cookie', cookie)
          .expect(204);

        const fetchedCharacter = await Character.findOne({ owner: user._id });

        expect(fetchedCharacter).toBeNull();
      }
    }
  });
});