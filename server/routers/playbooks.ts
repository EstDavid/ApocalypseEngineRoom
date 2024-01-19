import express from 'express';
import * as playbooksController from '../controller/playbooks';

const router = express.Router();

router.get('/:system/:playbook', playbooksController.getPlaybook);
router.get('/', playbooksController.getPlaybooks);

export default router;