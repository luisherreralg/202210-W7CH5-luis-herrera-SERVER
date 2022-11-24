import { NextFunction, Request, Response } from 'express';
import { type } from 'os';
import { mockUsers } from '../mocks/mocks';
import * as repository from '../repositories/user.repository';
import { controllerLogin, controllerRegister } from './users.controller';

jest.mock('../repositories/user.repository');

const mockError = {
    message: undefined,
    statusCode: 503,
    statusMessage: 'Service unavailable',
};

describe('Given the users controller methods', () => {
    describe('When they are invoked', () => {
        (repository.userFind as jest.Mock).mockResolvedValue(mockUsers[0]);
        (repository.userPost as jest.Mock).mockResolvedValue(mockUsers[0]);
        (repository.userGet as jest.Mock).mockResolvedValue(mockUsers[0]);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then controllerRegister should return a response with an object of mockUsers', async () => {
            req.body = mockUsers[0];
            await controllerRegister(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.json).toHaveBeenCalledWith({ user: mockUsers[0] });
        });

        test('Then controllerRegister should throw an error if the req.body is not valid', async () => {
            (repository.userPost as jest.Mock).mockRejectedValue('Error');
            req.body = null;
            await controllerRegister(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerLogin should return a response with an object of mockUsers', async () => {
            req.body = { name: 'Pepe', passwd: 'Pepe' };

            await controllerLogin(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.json).toHaveBeenCalledWith({ user: mockUsers[0] });
        });

        test('Then controllerLogin should return an rror if the credentials are wrong', () => {
            (repository.userFind as jest.Mock).mockResolvedValue('Error');
            req.body = { name: 'wrongUser', passwd: 'wrongpassword' };
            controllerLogin(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });
});
