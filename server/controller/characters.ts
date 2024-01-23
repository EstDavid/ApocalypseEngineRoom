import { Response } from 'express';
import Character from '../model/character';
import Tracker from '../model/tracker';
import Move from '../model/move';
import { ICharacter, CookieOptions, UpdateCharacterModel, CustomRequest } from '../types';
import { ISession } from './users';

export const getChars = (req: CustomRequest<CookieOptions, unknown>, res: Response) => {
  void (async () => {
    try {
      const session = req.session as ISession;

      const uid = session.uid;

      if (!uid) { throw ('Bad Credentials'); }

      const characters = await Character.find({ owner: uid }).select({ name: 1, playbook: 1, system: 1 });

      res.send(characters);
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const addChar = (req: CustomRequest<CookieOptions, ICharacter>, res: Response) => {
  void (async () => {
    try {
      const session = req.session as ISession;

      const uid = session.uid;

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
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const getCharById = (req: CustomRequest<CookieOptions, unknown>, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;
      const session = req.session as ISession;

      const uid = session.uid;

      if (!uid) { throw ('Bad Credentials'); }

      const character = await Character.findOne({ _id: id, owner: uid });
      res.send(character);
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const updateChar = (req: CustomRequest<CookieOptions, UpdateCharacterModel>, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;
      const session = req.session as ISession;

      const uid = session.uid;

      if (!uid) { throw ('Bad Credentials'); }

      const update: { [f: string]: string; } = {};
      const { newVal } = req.body;
      update[req.body.updatedField] = newVal;

      const updatedCharacter = await Character.findOneAndUpdate({ _id: id, owner: uid }, update, { new: true });

      res.send(updatedCharacter);
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const deleteChar = (req: CustomRequest<CookieOptions, unknown>, res: Response) => {
  void (async () => {
    try {
      const id = req.params.id;
      const session = req.session as ISession;

      const uid = session.uid;

      if (!uid) { throw ('Bad Credentials'); }

      await Character.findOneAndDelete({ _id: id, owner: uid });

      res.send('deleted');
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};
