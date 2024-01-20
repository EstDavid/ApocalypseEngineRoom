import { Router } from 'express';
import * as movesController from '../controller/moves';

const router = Router();

router.get('/:system/:playbook', movesController.getMoves);

export default router;