import mongoose from 'mongoose';
import { USER, PW, CLUSTER } from '../config.js';

export function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'Robots' : 'RobotsTesting';
    let uri = `mongodb+srv://${USER}:${PW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
