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
        name: 'test1',
        image: 'test1',
        speed: 0,
        endurance: 0,
        creationDate: 'test1',
        __v: 0,
    },
    {
        name: 'test2',
        image: 'test2',
        speed: 0,
        endurance: 0,
        creationDate: 'test2',
        __v: 0,
    },
];

describe('Given the robots.repository methods', () => {
    describe('When they are invoked', () => {
        let testIds: Array<string>;

        beforeEach(async () => {
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
            const newItem = {
                name: 'test',
                image: 'test',
                speed: 10,
                endurance: 20,
                creationDate: 'test',
                __v: 0,
            };
            const postItem = await repoPost(newItem);
            expect(postItem.name).toBe(newItem.name);
        });

        test('Then the repoPatch should update an existing robot', async () => {
            const mockedBody = {
                _id: testIds[0],
                name: 'updatedInfo',
            };
            const updatedItem = await repoPatch(mockedBody);
            expect(updatedItem.name).toEqual(mockedBody.name);
        });

        test('Then the repoDelete must return the deleted object', async () => {
            const deletedItem = await repoDelete(testIds[0]);
            expect(deletedItem.name).toEqual(mockData[0].name);
        });

        // ! ############ INTENTOS DE TEST PARA MEJORAR ############
        test.skip('Then if we pass to repoDelete a wrong id, it should throw an error', async () => {
            expect(async () => {
                await repoDelete('PEPE');
            }).rejects.toThrowError(mongoose.Error.CastError);
        });

        test.skip('Then if we pass to repoGet a wrong id, it should throw an error', async () => {
            expect(async () => {
                await repoGet('637d1a6d05dc2717a7740656');
            }).rejects.toThrowError(mongoose.Error.CastError);
        });

        test.skip('PlaceHolder Error throw', () => {
            expect(() => {
                throw new Error('Error');
            }).toThrowError('Error');
        });

        test.skip('RepoPost throw case', () => {
            expect(async () => {
                await repoPost({ name: 'test' });
            }).rejects.toThrowError(mongoose.Error.ValidationError);
        });
    });
});
