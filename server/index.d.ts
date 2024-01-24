import { ISession, IUser } from './types';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      session: ISession;
    }
  }
}


declare module "express-session" {
  interface Session {
    uid?: string;
  }
}
