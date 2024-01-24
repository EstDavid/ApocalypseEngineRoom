import { Request, Response } from 'express';
import Character from '../model/character';
import Tracker from '../model/tracker';
import Move from '../model/move';
import { ICharacter } from '../types';

const getChars = (req: Request, res: Response) => {
  void (async () => {
    try {
      if (req.user) {
        const uid = req.user._id;

        const characters = await Character.find({ owner: uid }).select({ name: 1, playbook: 1, system: 1 });

        res.send(characters);
        res.status(201);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

const addChar = (req: Request, res: Response) => {
  void (async () => {
    try {
      if (req.user) {
        const uid = req.user._id;

        if (!uid) { throw ('Bad Credentials'); }

        const { system, playbook, name, stats }: ICharacter = req.body;
        if ([system, playbook, name].some((field => typeof (field) != 'string'))) {
          throw ('Bad Input');
        }
        const trackers_response = await Tracker.find({ system, "playbook": { $in: ["basic", playbook] } }).select({ value: 1 });
        const moves_response = await Move.find({ system, "playbook": { $in: ["basic", playbook] } }).select({ isAvailable: 1 });

        const newChar = new Character({
          owner: uid,
          system,
          playbook,
          name,
          moves: trackers_response,
          trackers: moves_response,
          stats,
          "charDescription": "",
          "notes": ""
        });

        await newChar.save();
        res.status(201);
        res.send(newChar._id);
      } else {
        throw new Error('User not found');
      }

    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

const getCharById = (req: Request, res: Response) => {
  void (async () => {
    try {
      if (req.user) {
        const id = req.params.id;
        const uid = req.user._id;

        if (!uid) { throw ('Bad Credentials'); }

        const character = await Character.findOne({ _id: id, owner: uid });
        res.send(character);
        res.status(201);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

const updateChar = (req: Request, res: Response) => {
  void (async () => {
    try {
      if (req.user) {
        const id = req.params.id;
        const uid = req.user._id;

        if (!uid) { throw ('Bad Credentials'); }

        const update: { [f: string]: string; } = {};
        const { updatedField }: { updatedField: string; } = req.body;
        const { newVal } = req.body;
        update[updatedField] = newVal;

        const updatedCharacter = await Character.findOneAndUpdate({ _id: id, owner: uid }, update, { new: true });

        res.send(updatedCharacter);
        res.status(201);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

const deleteChar = (req: Request, res: Response) => {
  void (async () => {
    try {
      if (req.user) {
        const id = req.params.id;
        const uid = req.user._id;

        if (!uid) { throw ('Bad Credentials'); }

        await Character.findOneAndDelete({ _id: id, owner: uid });

        res.send('deleted');
        res.status(204);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export default {
  getChars,
  addChar,
  getCharById,
  updateChar,
  deleteChar
};
