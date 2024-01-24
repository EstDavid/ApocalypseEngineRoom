import { RequestHandler, Router } from 'express';
import playbooksController from '../controller/playbooks';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/:system/:playbook', authMiddleware as RequestHandler, playbooksController.getPlaybook);
router.get('/', authMiddleware as RequestHandler, playbooksController.getPlaybooks);

export default router;