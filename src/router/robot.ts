import { Router } from 'express';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from '../controllers/robots.controller.js';

export const robotRouter = Router();

// const controller = new ThingController(new ThingFileData());

robotRouter.get('/', controllerGetAll);
robotRouter.get('/:id', controllerGet);
robotRouter.post('/', controllerPost);
robotRouter.patch('/:id', controllerPatch);
robotRouter.delete('/:id', controllerDelete);
