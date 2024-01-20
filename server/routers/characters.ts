import { Router } from 'express';
import * as charactersController from '../controller/characters';

const router = Router();

router.get('/', charactersController.getChars);
router.post('/', charactersController.addChar);
router.get('/:id', charactersController.getCharById);
router.post('/:id', charactersController.updateChar);
router.delete('/:id', charactersController.deleteChar);

export default router;