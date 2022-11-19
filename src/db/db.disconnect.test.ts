import { dbConnect } from './db.connect.js';
import { dbDisconnect } from './db.disconnect.js';

describe('Given the db.disconnect module', () => {
    describe('When we use it', () => {
        test('Then it should return a 0', async () => {
            await dbConnect();
            const result = await dbDisconnect();
            expect(result).toBe(0);
        });
    });
});
