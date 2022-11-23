import mongoose from 'mongoose';
import { id } from '../data/data';
import { User, userModel } from '../interfaces/user.js';
import { passwdEncrypt } from '../services/auth.js';

export async function userGet(id: id): Promise<User> {
    const result = await userModel.findById(id);
    if (!result) {
        throw new Error('Not found id');
    }

    return result as unknown as User;
}

export async function userPost(data: Partial<User>): Promise<User> {
    if (typeof data.passwd !== 'string') {
        throw new Error('');
    }
    data.passwd = await passwdEncrypt(data.passwd);
    const result = await userModel.create({
        ...data,
        _id: new mongoose.Types.ObjectId(),
    });
    return result as unknown as User;
}

export async function userFind(search: {
    [key: string]: string | number | Date;
}): Promise<User> {
    const result = await userModel.findOne(search);
    if (!result) {
        throw new Error('Not found id');
    }
    return result as unknown as User;
}
