import app from '../index.ts';
import supertest from 'supertest';
import User from '../model/user.ts';
import { afterEach } from 'node:test';
import mongoose from 'mongoose';

describe('Integration tests', () => {

  const request = supertest(app);
  const user =  {username:'Tim', password:'safjnmadfjnaf363'};

  afterEach(async ()=>{
    await User.deleteMany();
  })

  afterAll(async()=>{
    await mongoose.disconnect();
    app.close();
  })

  it('should save a user to the database', async () =>{

    const res = await request.post('/api/users/signup', ).send(user);

    const createdUser = await User.find();
    console.log(res.status);
    expect(createdUser.username).toBe(user.username)

  })

})