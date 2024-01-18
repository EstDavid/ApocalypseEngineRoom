import { Request, Response } from 'express';
import Character from '../model/character';

export const getChars = async (req: Request, res: Response) => {
  try {
    const userID = req.cookies.userID;
    if (!userID) { throw ('Bad Credendials'); }
    res.send(await Character.find({ owner: userID }).select({ name: 1, playbook: 1, system: 1 }));
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const addChar = async (req: Request, res: Response) => {
  try {
    const userID = req.cookies.userID;
    if (!userID) { throw ('Bad Credendials'); }

    const { system, playbook, name, stats } = req.body;
    if ([system, playbook, name].some((field => typeof (field) != 'string'))) {
      throw ('Bad Input');
    }
    const trackers_response = db.tracker.find({ system, "playbook": { $in: ["basic", playbook] } }).select({ value: 1 });
    const moves_response = db.move.find({ system, "playbook": { $in: ["basic", playbook] } }).select({ isAvailable: 1 });

    Promise.all([trackers_response, moves_response]).then(function ([trackers, moves]) {
      const newChar = {
        owner: userID,
        system,
        playbook,
        name,
        moves,
        trackers,
        stats,
        "charDescription": "",
        "notes": ""
      };
      Character.create(newChar).then((createdChar) => res.send(createdChar._id));
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const getCharById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userID = req.cookies.userID;
    if (!userID) { throw ('Bad Credendials'); }

    res.send(await Character.findOne({ _id: id, owner: userID }));
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const updateChar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userID = req.cookies.userID;
    if (!userID) { throw ('Bad Credendials'); }

    const update = {};
    update[req.body.updatedField] = req.body.newVal;

    res.send(await Character.findOneAndUpdate({ _id: id, owner: userID }, update, { new: true }));
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const deleteChar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userID = req.cookies.userID;
    if (!userID) { throw ('Bad Credendials'); }

    Character.findOneAndDelete({ _id: id, owner: userID }).then(async () => {
      res.send('deleted');
    });
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
