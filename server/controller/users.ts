import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import { UserLogin } from '../types';
const saltRounds = 10;

export const getUser = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const { username, password }: UserLogin = req.body;
      if ([username, password].some((field => !(field && typeof (field) == 'string')))) {
        res.status(400);
        res.send('Wrong connection details');
      }

      const user = await User.findOne({ name: username });

      if (!user) {
        res.send('Wrong connection details');
        res.status(500);
      } else {
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
          res.status(200);
          res.cookie('userID', user._id, { maxAge: 7 * 60 * 60 * 1000 });
          res.send(user._id);
        } else {
          res.send('Wrong connection details');
          res.status(500);
        }
      }

      res.status(200);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const addUser = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const { username, password }: UserLogin = req.body;
      if ([username, password].some((field => typeof (field) != 'string'))) {
        res.status(400);
        res.send();
      }

      const user = await User.findOne({ name: username });

      if (!user) {
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
          name: username,
          password: hash
        });

        await newUser.save();

        res.cookie('userID', newUser._id, { maxAge: 60000 * 60 * 7 });
        res.send(newUser._id);
      } else {
        res.send('User Already exists');
        res.status(500);
      }

    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const logout = (_: Request, res: Response) => {
  try {
    res.clearCookie('userID');
    res.send('cookie cleared');
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
