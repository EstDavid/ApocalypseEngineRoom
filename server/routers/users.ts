import { Router } from 'express';
import * as usersController from '../controller/users';

const router = Router();

router.post('/login', usersController.getUser);
router.post('/signup', usersController.addUser);
router.post('/logout', usersController.logout);

export default router;