import mongoose, { model, Schema, Types } from 'mongoose';

export type ProtoUser = {
    name?: string;
    email?: string;
    passwd?: string;
    role?: string;
};

export type User = {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    passwd: string;
    role: string;
    robots: Array<Types.ObjectId>;
};

export const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    passwd: String,
    role: String,
    robots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Robot',
        },
    ],
});

export const userModel = model('User', userSchema, 'Users');
