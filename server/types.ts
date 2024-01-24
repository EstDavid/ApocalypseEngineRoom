import express, { Request, Response } from 'express';
import { Session } from 'express-session';

const router = express.Router();

export type Method = 'get' | 'post' | 'put' | 'delete';
export type Handler = (req: Request, res: Response) => Promise<void>;
export type HandlerWithoutPromise = (req: Request, res: Response) => void;

export function route (method: Method, path: string, handler: Handler): void {
  router[method](path, (req, res, next) => { handler(req, res).catch(next); });
}

export function routeWithoutPromise (method: Method, path: string, handler: HandlerWithoutPromise): void {
  router[method](path, (req, res) => { handler(req, res); });
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  password: string;
}

export interface ISession extends Session {
  uid?: string;
}

export interface CookieOptions {
  name: string;
  value: string;
  userID?: string;
  expiresIn?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export interface ICharacter {
  name: string,
  system: string,
  playbook: string,
  charDescription?: string,
  moves?: [
    {
      isAvailable: boolean,
    }
  ],
  trackers?: [
    {
      value: number;
    }
  ],
  stats: [{ name: string, value: number; }],
  owner?: string,
  notes?: string;
}

export interface UpdateCharacterModel {
  newVal: string;
  updatedField: string;
}

export interface CustomRequest extends Request {
  cookies: CookieOptions;
  user?: IUser;
  session: ISession;
}

export type CustomRequestAuth = Required<CustomRequest>;
