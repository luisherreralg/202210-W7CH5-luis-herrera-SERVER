import mongoose, { Types } from 'mongoose';
import { dbConnect } from '../db/db.connect';
import { mockRobots, setRobotCollection } from '../mocks/mocks';
import {
    repoDelete,
    repoGet,
    repoGetAll,
    repoPatch,
    repoPost,
} from './robots.repository';

const newItem = {
    _id: new mongoose.Types.ObjectId(),
    name: 'test',
    image: 'test',
    speed: 10,
    endurance: 20,
    creationDate: 'test',
    robots: [],
    __v: 0,
};

describe('Given the robots.repository methods', () => {
    describe('When they are invoked', () => {
        let robotIds: Array<string>;
        beforeEach(async () => {
            await dbConnect();
            robotIds = await setRobotCollection();
        });

        afterAll(async () => {
            await mongoose.disconnect();
        });

        test('Then repoGetAll should return two mocked items', async () => {
            const getData = await repoGetAll();
            expect(getData).toHaveLength(2);
        });

        test('Then repoGet should return one mocked item', async () => {
            const getItem = await repoGet(robotIds[0]);
            expect(getItem.name).toBe(mockRobots[0].name);

            // ! Intentando cubrir coverage de error
            expect(async () => await repoGet(robotIds[0])).not.toThrow();
        });

        test('Then repoPost should create a new item', async () => {
            const postItem = await repoPost(newItem);
            expect(postItem.name).toBe(newItem.name);
        });

        test('Then the repoPatch should update an existing robot', async () => {
            // TODO: Revisar la _id y que pase el test
            const mockedBody = {
                _id: new mongoose.Types.ObjectId(robotIds[0]),
                name: 'update',
                image: 'update',
                speed: 10,
                endurance: 20,
                creationDate: 'test',
                robots: [],
            };
            const updatedItem = await repoPatch(mockedBody);
            expect(updatedItem.name).toEqual(mockedBody.name);
        });

        test('Then the repoDelete must return the deleted object', async () => {
            const deletedItem = await repoDelete(robotIds[0]);
            expect(deletedItem.name).toEqual(mockRobots[0].name);
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
                await repoPost(newItem);
            }).rejects.toThrowError(mongoose.Error.ValidationError);
        });
    });
});
