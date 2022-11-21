import { Router } from 'express';
import {
    controllerLogin,
    controllerRegister,
} from '../controllers/users.controller.js';

export const userRouter = Router();

userRouter.post('/register', controllerRegister);
userRouter.post('/login', controllerLogin);
