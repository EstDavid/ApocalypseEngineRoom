import { Router } from 'express';
import * as trackersController from '../controller/trackers';

const router = Router();

router.get('/:system/:playbook', trackersController.getTrackers);

export default router;