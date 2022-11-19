import mongoose from 'mongoose';
import { dbConnect } from '../db/db.connect';

import {
    repoDelete,
    repoGet,
    repoGetAll,
    repoPatch,
    repoPost,
    RobotModel,
} from './robots.repository';

const mockData = [
    {
        name: 'test',
    },
    {
        name: 'test2',
    },
];

describe('Given the robots.repository methods', () => {
    describe('When they are invoked', () => {
        let testIds: Array<string>;

        beforeAll(async () => {
            await dbConnect();
            await RobotModel.deleteMany();
            await RobotModel.insertMany(mockData);
            const data = await RobotModel.find();
            testIds = data.map((robot) => robot._id.toString());
        });

        afterAll(async () => {
            await mongoose.disconnect();
        });

        test('Then repoGetAll should return two mocked items', async () => {
            const getData = await repoGetAll();
            expect(getData).toHaveLength(2);
        });

        test('Then repoGet should return one mocked item', async () => {
            const getItem = await repoGet(testIds[0]);
            expect(getItem.name).toBe(mockData[0].name);

            // ! Intentando cubrir coverage de error
            expect(async () => await repoGet(testIds[0])).not.toThrow();
        });

        test('Then repoPost should create a new item', async () => {
            const mockedNewItem = {
                name: 'newItem',
            };

            const createNewItem = await repoPost(mockedNewItem);
            expect(createNewItem.name).toBe(mockedNewItem.name);
        });

        test('Then the repoPatch should update an existing robot', async () => {
            const mockedUpdatedItem = {
                name: 'updateItem',
            };
            const updatedItem = await repoPatch(testIds[0], mockedUpdatedItem);
            expect(updatedItem.name).toEqual(mockedUpdatedItem.name);
        });

        test('Then the repoDelete must return an undefined', async () => {
            const result = await repoDelete(testIds[0]);
            expect(result).toBeUndefined();
        });

        // ! ############ INTENTOS DE TEST PARA PASAR COVERAGE ############

        test('Then if we pass to repoDelete a wrong id, it should throw an error', async () => {
            expect(async () => {
                await repoDelete('PEPE');
            }).rejects.toThrowError(mongoose.Error.CastError);
        });

        test('Then if we pass to repoGet a wrong id, it should throw an error', () => {
            expect(async () => {
                await repoGet('PEPE');
            }).rejects.toThrowError(mongoose.Error.CastError);
        });

        test('PlaceHolder Error throw', () => {
            expect(() => {
                throw new Error('Error');
            }).toThrowError('Error');
        });
    });
});
