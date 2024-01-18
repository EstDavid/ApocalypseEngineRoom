import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/';

const getUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if ([username, password].some((field => !(field && typeof (field) == 'string')))) {
      res.status(400);
      res.send('Wrong connection details');
    }

    db.user.findOne({ name: username }).then((user) => {
      if (!user) {
        res.send('Wrong connection details');
        res.status(500);
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result == true) {
            res.status(200);
            res.cookie('userID', user._id, { maxAge: 7 * 60 * 60 * 1000 });
            res.send(user._id);
          } else {
            res.send('Wrong connection details');
            res.status(500);
          }
        });
      }
    });

    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if ([username, password].some((field => typeof (field) != 'string'))) {
      res.status(400);
      res.send();
    }

    db.user.findOne({ name: username }).then((user) => {
      if (!user) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          db.user.create({
            name: username,
            password: hash
          }).then((createdUser) => {
            res.cookie('userID', createdUser._id, { maxAge: 60000 * 60 * 7 });
            res.send(createdUser._id);
          });
        });
      } else {
        res.send('User Already exists');
        res.status(500);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('userID');
    res.send('cookie cleared');
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

module.exports = {
  getUser,
  addUser,
  logout
};