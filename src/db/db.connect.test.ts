import { dbConnect } from './db.connect.js';
import mongoose from 'mongoose';

describe('Given the db.connect module', () => {
    describe('When we use it', () => {
        test('Then it should return a type of mongoose', async () => {
            const result = await dbConnect();
            expect(typeof result).toBe(typeof mongoose);
            mongoose.disconnect();
        });

        test('When the NODE_ENV is not "test"', () => {
            process.env.NODE_ENV = 'development';
            const result = dbConnect();
            expect(result).toBeInstanceOf(Promise);
            mongoose.disconnect();
        });
    });
});
