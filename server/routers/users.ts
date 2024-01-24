import { RequestHandler, Router } from 'express';
import usersController from '../controller/users';
import authMiddleware from '../middleware/auth';
import checkLoginDetails from '../middleware/login';

const router = Router();

router.post('/login', checkLoginDetails, usersController.getUser);
router.post('/signup', checkLoginDetails, usersController.addUser);
router.post('/logout', authMiddleware as unknown as RequestHandler, usersController.logout);

export default router;