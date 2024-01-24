import { RequestHandler, Router } from 'express';
import authMiddleware from '../middleware/auth';
import movesController from '../controller/moves';

const router = Router();

router.get('/:system/:playbook', authMiddleware as RequestHandler, movesController.getMoves);

export default router;