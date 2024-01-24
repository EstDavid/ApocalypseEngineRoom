import { Request, Response } from 'express';
import Move from '../model/move';

const getMoves = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { system, playbook } = req.params;

      res.send(await Move.find({ system, "playbook": { $in: ["basic", playbook] } }));
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export default { getMoves };
