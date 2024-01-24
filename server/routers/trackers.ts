import { RequestHandler, Router } from 'express';
import trackersController from '../controller/trackers';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/:system/:playbook', authMiddleware as RequestHandler, trackersController.getTrackers);

export default router;