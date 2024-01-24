import { RequestHandler, Router } from 'express';
import * as charactersController from '../controller/characters';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware as RequestHandler, charactersController.getChars);
router.post('/', authMiddleware as RequestHandler, charactersController.addChar);
router.get('/:id', authMiddleware as RequestHandler, charactersController.getCharById);
router.post('/:id', authMiddleware as RequestHandler, charactersController.updateChar);
router.delete('/:id', authMiddleware as RequestHandler, charactersController.deleteChar);

export default router;