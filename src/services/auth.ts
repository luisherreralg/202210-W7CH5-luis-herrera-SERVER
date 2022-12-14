import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import { SECRET } from '../config.js';

export type TokenPayload = {
    id: string;
    name: string;
    role: string;
};

export const createToken = (payload: TokenPayload) => {
    if (typeof SECRET !== 'string') {
        throw new Error();
    }
    return jwt.sign(payload, SECRET);
};

export const readToken = (token: string) => {
    if (typeof SECRET !== 'string') {
        throw new Error();
    }

    const payload = jwt.verify(token, SECRET);

    if (typeof payload === 'string') {
        throw new Error('Token not valid');
    }

    return payload;
};

export const passwdEncrypt = (passwd: string) => {
    return bc.hash(passwd, 10);
};

export const passwdValidate = (newPasswd: string, hash: string) => {
    return bc.compare(newPasswd, hash);
};
