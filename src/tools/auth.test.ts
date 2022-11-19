import { createToken, readToken } from './auth';
import jwt from 'jsonwebtoken';

describe('Given createToken function', () => {
    describe('When its invoked', () => {
        test('Then it should return...', () => {
            const signSpy = jest.spyOn(jwt, 'sign');
            const mockPayload = { userName: 'pepe' };
            const result = createToken(mockPayload);
            expect(typeof result).toBe('string');
            expect(signSpy).toHaveBeenCalled();
        });
    });
});

describe('Given the readToken function', () => {
    const mockPayload = { userName: 'pepe' };
    const token = createToken(mockPayload);

    describe('When its invoked with a valid token', () => {
        test('Then it should return the payload', () => {
            const result = readToken(token);
            console.log(token);
            expect(result.userName).toEqual(mockPayload.userName);
        });

        // ! Da problemas con la github action
        // test('Not vaild test', () => {
        //     const invalidToken =
        //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBlcGUiLCJpYXQiOjE2Njg3NzM1Nzl9.Fc-onucI_EXD53y72Qoj5MEGlu3VlP4l0CApxF2n0RA';

        //     expect(() => readToken(invalidToken)).toThrow();
        // });
    });
});
