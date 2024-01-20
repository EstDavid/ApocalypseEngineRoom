import { Request, Response } from 'express';
import Tracker from '../model/tracker';

export const getTrackers = (req: Request, res: Response) => {
  void (async () => {
    try {
      const system = req.params.system;
      const playbook = req.params.playbook;
      res.send(await Tracker.find({ system, "playbook": { $in: ["basic", playbook] } }));
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};
