import { route, routeWithoutPromise } from '../types';
import * as usersController from '../controller/users';

route('post', '/login', usersController.getUser);
route('post', '/signup', usersController.addUser);
routeWithoutPromise('post', '/logout', usersController.logout);

export default route;