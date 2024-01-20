import { Request, Response } from 'express';
import Playbook from '../model/playbook';

export const getPlaybook = (req: Request, res: Response) => {
  void (async () => {
    try {
      const systemName = req.params.system;
      const name = req.params.playbook;
      res.send(await Playbook.findOne({ systemName, name }));
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};

export const getPlaybooks = (req: Request, res: Response) => {
  void (async () => {
    try {
      res.send(await Playbook.find({}).select({ name: 1, systemName: 1, statsOptions: 1, statOptionsText: 1, description: 1 }));
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  })();
};