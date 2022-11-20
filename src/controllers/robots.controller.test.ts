import { NextFunction, Request, Response } from 'express';
import * as repository from '../data/robots.repository.js';

import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from './robots.controller.js';
jest.mock('../data/robots.repository');

const mockData = [
    {
        id: '0',
        name: 'test0',
        image: 'test0',
        speed: 0,
        endurance: 0,
        creationDate: 0,
    },
    {
        id: '1',
        name: 'test1',
        image: 'test1',
        speed: 1,
        endurance: 1,
        creationDate: 1,
    },
];

const mockError = {
    message: undefined,
    statusCode: 503,
    statusMessage: 'Service unavailable',
};

describe('Given the robots controller methods', () => {
    describe('When they are invoked', () => {
        (repository.repoGetAll as jest.Mock).mockResolvedValue(mockData);
        (repository.repoGet as jest.Mock).mockResolvedValue(mockData[0]);
        (repository.repoPost as jest.Mock).mockResolvedValue(mockData[0]);
        (repository.repoPatch as jest.Mock).mockResolvedValue(mockData);
        (repository.repoDelete as jest.Mock).mockResolvedValue({});

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then controllerGetAll should return a response with an array of mockData', async () => {
            await controllerGetAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robots: mockData });
        });

        test('Then when controllerGetAll cant get a response, it should return an error', async () => {
            (repository.repoGetAll as jest.Mock).mockRejectedValue('Error');
            await controllerGetAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerGet should return a response with an object of mockData', async () => {
            req.params = { id: '0' };
            await controllerGet(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
        });

        test('Then if the controllerGet cant get a response, it should return an error', async () => {
            (repository.repoGet as jest.Mock).mockRejectedValue('Error');
            await controllerGet(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerPost should return a response with an object of mockData', async () => {
            req.body = mockData[0];

            await controllerPost(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
        });

        test('Then if the controllerPost cant get a response, it should return an error', async () => {
            (repository.repoPost as jest.Mock).mockRejectedValue('Error');
            await controllerPost(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerPatch should return a response with an array of mockData', async () => {
            req.body = mockData[0];
            req.params = { id: '0' };
            await controllerPatch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robots: mockData });
        });

        test('Then if the controllerPatch cant get a response, it should return an error', async () => {
            (repository.repoPost as jest.Mock).mockRejectedValue('Error');
            await controllerPatch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });

        test('Then controllerDelete should return a response with the deleted object', async () => {
            req.params = { id: '0' };
            await controllerDelete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({
                robot: {
                    creationDate: 0,
                    endurance: 0,
                    id: '0',
                    image: 'test0',
                    name: 'test0',
                    speed: 0,
                },
            });
        });

        test('Then if the controllerDelete cant get a response, it should return an error', async () => {
            (repository.repoDelete as jest.Mock).mockRejectedValue('Error');
            await controllerDelete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(mockError);
        });
    });
});
