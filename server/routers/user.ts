import express from 'express';

const router = express.Router();

router.post('/login/', controller.getUser);
router.post('/signup', controller.addUser);
router.post('/logout', controller.logout);