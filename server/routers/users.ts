import { RequestHandler, Router } from 'express';
import usersController from '../controller/users';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/login', usersController.getUser);
router.post('/signup', usersController.addUser);
router.post('/logout', authMiddleware as unknown as RequestHandler, usersController.logout);

export default router;