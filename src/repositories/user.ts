import { model } from 'mongoose';
import { id } from '../data/data';
import { User, userSchema } from '../interfaces/user.js';
import { passwdEncrypt } from '../services/auth.js';

const userModel = model('User', userSchema, 'Users');

export async function userGet(id: id): Promise<User> {
    const result = await userModel.findById(id);
    if (!result) throw new Error('Not found id');
    return result as User;
}

export async function userPost(data: Partial<User>): Promise<User> {
    if (typeof data.passwd !== 'string') throw new Error('');
    data.passwd = await passwdEncrypt(data.passwd);
    const result = await userModel.create(data);
    return result as User;
}

export async function userFind(search: {
    [key: string]: string | number | Date;
}): Promise<User> {
    console.log(search);
    const result = await userModel.findOne(search);
    if (!result) throw new Error('Not found id');
    return result as unknown as User;
}
