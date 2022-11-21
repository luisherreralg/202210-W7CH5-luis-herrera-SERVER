import { Router } from 'express';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from '../controllers/robots.controller.js';
import { logged } from '../middleware/interceptors/logged.js';

export const robotRouter = Router();

robotRouter.get('/', logged, controllerGetAll);
robotRouter.get('/:id', logged, controllerGet);
robotRouter.post('/', logged, controllerPost);
robotRouter.patch('/', logged, controllerPatch);
robotRouter.delete('/:id', logged, controllerDelete);
