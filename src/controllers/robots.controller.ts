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
        resp.json(robots);
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
        req.body.owner = user.id;
        const robot = await repoPost(req.body);
        console.log(req.body);
        resp.json({ robot });
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
    req: Request,
    resp: Response,
    next: NextFunction
) {
    try {
        const robot = await repoDelete(req.params.id);
        resp.json({ robot });
    } catch (error) {
        next(createHttpError(error as Error));
    }
}
