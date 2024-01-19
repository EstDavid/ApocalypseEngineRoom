import { route } from '../types';
import * as trackersController from '../controller/trackers';

route('get', '/:system/:playbook', trackersController.getTrackers);

export default route;