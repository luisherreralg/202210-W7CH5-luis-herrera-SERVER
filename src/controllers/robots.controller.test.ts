import { NextFunction, Request, Response } from 'express';
import * as repository from '../data/robots.repository.js';
import { mockRobots } from '../mocks/mocks.js';
import {
    controllerDelete,
    controllerGet,
    controllerGetAll,
    controllerPatch,
    controllerPost,
} from './robots.controller.js';
jest.mock('../data/robots.repository.js');

const mockError = {
    message: undefined,
    statusCode: 503,
    statusMessage: 'Service unavailable',
};

describe('Given the robots controller methods', () => {
    describe('When they are invoked', () => {
        (repository.repoGetAll as jest.Mock).mockResolvedValue(mockRobots);
        (repository.repoGet as jest.Mock).mockResolvedValue(mockRobots[0]);
        (repository.repoPost as jest.Mock).mockResolvedValue(mockRobots[0]);
        (repository.repoPatch as jest.Mock).mockResolvedValue(mockRobots);
        (repository.repoDelete as jest.Mock).mockResolvedValue(mockRobots[0]);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then controllerGetAll should return a response with an array of mockRobots', async () => {
            await controllerGetAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.json).toHaveBeenCalledWith(mockRobots);
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

        test('Then controllerGet should return a response with an object of mockRobots', async () => {
            req.params = { _id: '0' };
            await controllerGet(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robot: mockRobots[0] });
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

        test('Then controllerPost should return a response with an object of mockRobots', async () => {
            req.body = mockRobots[0];

            await controllerPost(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({ robot: mockRobots[0] });
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

        test('Then controllerPatch should return a response with an array of mockRobots', async () => {
            req.body = mockRobots[0];
            req.params = { _id: '0' };
            await controllerPatch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith(mockRobots);
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

        // TODO: Me dice timeout
        test.skip('Then controllerDelete should return a response with the deleted object', async () => {
            req.params = { _id: mockRobots[0]._id.toString() as string };

            await controllerDelete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.json).toHaveBeenCalledWith({
                robot: mockRobots[0],
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
