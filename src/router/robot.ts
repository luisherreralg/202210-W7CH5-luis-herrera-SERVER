import { Router } from 'express';
import { Schema } from 'mongoose';
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

const robotsImageUrl = 'https://robohash.org/';

export const placeHolderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        set: (name: string) => `${robotsImageUrl}${name}`,
    },

    description: {
        type: String,
        required: true,
    },
});

placeHolderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
