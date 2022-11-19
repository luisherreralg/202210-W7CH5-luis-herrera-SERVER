import { Router } from 'express';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from '../controllers/robots.controller.js';

export const robotRouter = Router();

robotRouter.get('/', controllerGetAll);
robotRouter.get('/:id', controllerGet);
robotRouter.post('/', controllerPost);
robotRouter.patch('/:id', controllerPatch);
robotRouter.delete('/:id', controllerDelete);
