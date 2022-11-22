import { NextFunction, Request, Response } from 'express';
import { ExtraRequest } from '../../controllers/robots.controller';
import { createHttpError } from '../../interfaces/error';
import { logged } from './logged';

describe('Given the logged interceptor', () => {
    describe('When its invoked', () => {
        test('When the authString is empty, it should return an error', () => {
            const req: Partial<Request> = {
                get: jest.fn().mockReturnValueOnce(false),
            };
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();

            logged(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(
                createHttpError(new Error('Not logged'))
            );
        });
    });

    test('Then if the readToken function reads the token and its not valid, then it should return an error', () => {
        const req: Partial<Request> = {
            get: jest.fn().mockReturnValueOnce('Bearer 1234'),
        };
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();

        logged(req as Request, res as Response, next);
        expect(next).toHaveBeenCalledWith(
            createHttpError(new Error('jwt malformed'))
        );
    });

    test('Then if the readToekn function reads a correct token, it should return the payload', () => {
        const req: Partial<ExtraRequest> = {
            get: jest
                .fn()
                .mockReturnValueOnce(
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ikx1aXMiLCJpYXQiOjE2NjkxMTc2MTN9.TJDt8iGUItGG1wo7tzmyEKzKv06pTYI4gH8DR1eTG_U'
                ),
        };
        const res: Partial<Response> = {};
        const next: NextFunction = jest.fn();

        logged(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
        expect(req.payload).toStrictEqual({
            userName: 'Luis',
            iat: 1669117613,
        });
    });
});
