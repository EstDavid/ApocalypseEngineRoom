import express, { Express } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import charactersRouter from './routers/characters';
import movesRouter from './routers/moves';
import trackersRouter from './routers/trackers';
import playbooksRouter from './routers/playbooks';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

mongoose.set('strictQuery', false);

const MONGO_DB_URI = process.env.NODE_ENV === 'test' ?
  process.env.DATABASE_REMOTE_TEST : process.env.DATABASE_REMOTE;

console.log(`Connecting to MongoDB`);

if (!MONGO_DB_URI) {
  throw new Error('No database uri provided');
}

mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.log(`Error in connection to MongoDB: ${error.message}`);
  });


const app: Express = express();
const secret = process.env.SECRET;
app.use(cookieParser());

if (!secret) {
  throw new Error('No secret provided');
}
app.use(session({ secret: secret }));

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_ORIGIN,
  exposedHeaders: ['set-cookie']
}));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/moves', movesRouter);
app.use('/api/trackers', trackersRouter);
app.use('/api/playbooks', playbooksRouter);

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default server;