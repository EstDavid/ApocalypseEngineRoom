import { route } from '../types';
import * as movesController from '../controller/moves';

route('get', '/:system/:playbook', movesController.getMoves);

export default route;