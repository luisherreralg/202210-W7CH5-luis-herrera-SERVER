import mongoose from 'mongoose';
import { dbConnect } from '../db/db.connect';
import { userModel } from '../interfaces/user';
import { mockUsers, newUser, setUserCollection } from '../mocks/mocks';
import { userFind, userGet, userPost } from './user.repository';

describe('Given the user repository', () => {
    describe('When its invoked', () => {
        let userIds: Array<string>;

        beforeEach(async () => {
            await dbConnect();
            userIds = await setUserCollection();
        });

        afterAll(async () => {
            await mongoose.disconnect();
        });

        test('Then the userPost should return a User', async () => {
            const result = await userPost(newUser);
            expect(result.name).toBe(newUser.name);
        });

        // TODO: Intentando cubrir el caso de error
        test.skip('Then the userPost should return an error fi the data.passwd is not a string', () => {
            // newUser.passwd = 0 <--- No se me ocurre como introducir un tipo number en un tipo string
            // userPost(newUser)
        });

        test('Then the userGet should return the specified user', async () => {
            const result = await userGet(userIds[0]);
            expect(result.name).toBe(mockUsers[0].name);
        });

        test('Then if we use userGet and the id is not valid, it should throw an error', async () => {
            expect(async () => {
                await userGet('Wrong id');
            }).rejects.toThrow(
                new Error(
                    'Cast to ObjectId failed for value "Wrong id" (type string) at path "_id" for model "User"'
                )
            );
        });

        test('Then the userFind should find the specified key', async () => {
            const result = await userFind({ name: 'Pepe' });
            expect(result.name).toBe(mockUsers[0].name);
        });
    });
});
