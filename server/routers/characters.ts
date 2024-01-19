import { route } from '../types';
import * as charactersController from '../controller/characters';

route('get', '/', charactersController.getChars);
route('post', '/', charactersController.addChar);
route('get', '/:id', charactersController.getCharById);
route('post', '/:id', charactersController.updateChar);
route('delete', '/:id', charactersController.deleteChar);

export default route;