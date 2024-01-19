import { route } from '../types';
import * as playbooksController from '../controller/playbooks';

route('get', '/:system/:playbook', playbooksController.getPlaybook);
route('get', '/', playbooksController.getPlaybooks);

export default route;