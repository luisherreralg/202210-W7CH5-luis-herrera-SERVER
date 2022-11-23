import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {
    repoDelete,
    repoGet,
    repoGetAll,
    repoPatch,
    repoPost,
} from '../data/robots.repository.js';
import { createHttpError, HTTPError } from '../interfaces/error.js';
import { userGet } from '../repositories/user.repository.js';
import { userModel } from '../interfaces/user.js';
// import createDebug from 'debug';
// const debug = createDebug('W8:app:robots.controller');

export interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export async function controllerGetAll(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const robots = await repoGetAll();
        resp.status(201).json(robots);
    } catch (error) {
        const httpError = HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        next(httpError);
    }
}

export async function controllerGet(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const robot = await repoGet(req.params.id);
        resp.json({ robot });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}

export async function controllerPost(
    req: ExtraRequest,
    resp: Response,
    next: NextFunction
) {
    try {
        if (!req.payload) {
            throw new Error('Invalid payload');
        }

        const user = await userGet(req.payload.id);
        req.body.owner = user._id;
        const robot = await repoPost(req.body);

        // debug('robot', robot);
        // debug('user', user);
        // user.robots.push(robot._id);
        user.robots.push(robot._id);
        // debug('user', user);
        await userModel.findByIdAndUpdate(user._id, user, {
            new: true,
        });

        resp.status(201).json({ robot });
    } catch (error) {
        const httpError = HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        next(httpError);
    }
}

export async function controllerPatch(
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const robot = await repoPatch(req.body);
        resp.json({ robot });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}

export async function controllerDelete(
    req: ExtraRequest,
    resp: Response,
    next: NextFunction
) {
    try {
        const robot = await repoDelete(req.params.id);
        const user = await userGet(req.payload?.id as string);
        user.robots = user.robots.filter(
            (id) => id.toString() !== robot._id.toString()
        );
        await userModel.findByIdAndUpdate(user._id, user, { new: true });
        resp.json({ robot });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}
