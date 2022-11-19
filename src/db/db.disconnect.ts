import mongoose from 'mongoose';

export async function dbDisconnect() {
    await mongoose.disconnect();
    return mongoose.connection.readyState;
}
