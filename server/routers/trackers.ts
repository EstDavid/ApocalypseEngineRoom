import express from 'express';
import * as trackersController from '../controller/trackers';

const router = express.Router();

router.get('/:system/:playbook', trackersController.getTrackers);

export default router;