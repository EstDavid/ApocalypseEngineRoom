import { NextFunction, Request, Response } from 'express';
import { UserLogin } from '../types';

const checkLoginDetails = (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: UserLogin = req.body;

  if ([username, password].some((field => !(field && typeof (field) == 'string')))) {
    return res
      .status(400)
      .send('Invalid input format. Both username and password must be strings.');
  }

  next();
};

export default checkLoginDetails;