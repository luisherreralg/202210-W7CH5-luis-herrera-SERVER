import { createHttpError, HTTPError } from './error';

describe('Given the HTTPError function', () => {
    describe('When its invoked', () => {
        test('Then it should return an object', () => {
            const result = HTTPError(404, 'Not Found', 'Not found id');
            expect(result).toEqual({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Not found id',
            });
        });
    });
});

describe('Given the createHttpError function', () => {
    describe('When its invoked', () => {
        test('Then it should return an object', () => {
            const result = createHttpError(new Error('Not found id'));
            expect(result).toEqual({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Not found id',
            });
        });
    });
});
