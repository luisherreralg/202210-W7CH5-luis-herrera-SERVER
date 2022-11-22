import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { createHttpError } from '../../interfaces/error.js';
import { readToken } from '../../services/auth.js';

interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const authString = req.get('Authorization');

    if (!authString || !authString.startsWith('Bearer ')) {
        next(createHttpError(new Error('Not logged')));
        return;
    }

    try {
        const token = authString.slice(7);
        req.payload = readToken(token);
        next();
    } catch (error) {
        next(createHttpError(error as Error));
    }
};
