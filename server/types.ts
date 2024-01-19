import express, { Request, Response } from 'express';

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

export interface Character {
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

export interface CustomRequest<R, T> extends Request {
  cookies: R;
  body: T;
}