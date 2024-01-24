import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import { ISession, UserLogin } from '../types';
const saltRounds = 10;

const getUser = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const { username, password }: UserLogin = req.body;

      const user = await User.findOne({ name: username });

      if (!user) {
        res.status(401);
        res.send('Invalid username or password. Please check and try again.');
      } else {
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
          (req.session as ISession).uid = (user._id).toString();

          res.status(200).send(user);
        } else {
          res.status(401);
          res.send('Invalid username or password. Please check and try again.');
        }
      }
    } catch (err) {
      console.log(err, req.body);
      res.status(500);
    }
  })();
};

const addUser = (req: Request, res: Response): void => {
  void (async () => {
    try {
      const { username, password }: UserLogin = req.body;

      const user = await User.findOne({ name: username });

      if (!user) {
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
          name: username,
          password: hash
        });

        await newUser.save();

        (req.session as ISession).uid = (newUser._id).toString();
        res.status(201).send(newUser);
      } else {
        res.status(409);
        res.send('User Already exists');
      }

    } catch (err) {
      console.log(err);
      res.status(500);
    }
  })();
};

const logout = (_: Request, res: Response) => {
  try {
    res
      .clearCookie('sid')
      .send('cookie cleared')
      .status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export default {
  getUser,
  addUser,
  logout
};
