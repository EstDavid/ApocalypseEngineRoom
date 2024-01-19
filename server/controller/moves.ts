import { Request, Response } from 'express';
import Move from '../model/move';

export const getMoves = async (req: Request, res: Response) => {
  try {
    const { system, playbook } = req.params;

    res.send(await Move.find({ system, "playbook": { $in: ["basic", playbook] } }));
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
