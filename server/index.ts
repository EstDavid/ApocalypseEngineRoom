import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
// import router from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app: Express = express();
const secret = process.env.SECRET;
app.use(cookieParser());

console.log('secretsss', secret);

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

// app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});