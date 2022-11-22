import { NextFunction, Request, Response } from 'express';
import { createHttpError } from '../interfaces/error.js';
import { userFind, userPost } from '../repositories/user.repository.js';
import { createToken, passwdValidate } from '../services/auth.js';

export async function controllerLogin(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const user = await userFind({ name: req.body.name });
        const isPasswdValid = await passwdValidate(
            req.body.passwd,
            user.passwd
        );

        if (!isPasswdValid) throw new Error();
        const token = createToken({
            name: user.name,
            id: user.id,
            role: user.role,
        });
        resp.json({ token });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}

export async function controllerRegister(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const user = await userPost(req.body);
        resp.json({ user });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}
