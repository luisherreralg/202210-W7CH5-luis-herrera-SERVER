import mongoose from 'mongoose';
import { dbConnect } from '../db/db.connect';
import { userModel } from '../interfaces/user';
import { userFind, userGet, userPost } from './user.repository';

const mockData = [
    {
        name: 'Pepe',
        email: '',
        password: '',
        role: 'user',
    },
    {
        name: 'Juan',
        email: '',
        password: '',
        role: 'user',
    },
];

const newUser = {
    name: 'newUser',
    email: '',
    passwd: '',
    role: 'user',
};

describe('Given the user repository', () => {
    describe('When its invoked', () => {
        let testIds: Array<string>;

        beforeEach(async () => {
            await dbConnect();
            await userModel.deleteMany();
            await userModel.insertMany(mockData);
            const data = await userModel.find();
            testIds = data.map((user) => user._id.toString());
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
            const result = await userGet(testIds[0]);
            expect(result.name).toBe(mockData[0].name);
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
            expect(result.name).toBe(mockData[0].name);
        });
    });
});
