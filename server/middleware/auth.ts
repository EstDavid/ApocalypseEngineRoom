import { NextFunction, Request, Response } from 'express';
import { IUser, CustomRequestAuth } from '../types';
import User from '../model/user';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = req.session;
    const { uid } = session;

    if (uid) {
      const user: IUser | null = await User.findById(uid);

      if (!user) {
        throw new Error;
      }

      req.user = user;
      req = req as CustomRequestAuth;
      next();
    } else {
      throw new Error();
    }

  } catch {
    res.status(400).send('Bad Credentials');
  }
};

export default authMiddleware;