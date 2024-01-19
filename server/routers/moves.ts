import express from 'express';
import * as movesController from '../controller/moves';

const router = express.Router();

router.get('/:system/:playbook', movesController.getMoves);

export default router;