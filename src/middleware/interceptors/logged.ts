import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { createHttpError } from '../../interfaces/error';
import { readToken } from '../../services/auth';

interface ExtraRequest extends Request {
    payload: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const authString = req.get('Authorization');
    if (!authString || authString?.slice(1, 6) !== 'Bearer') {
        next(new Error('No token provided'));
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
