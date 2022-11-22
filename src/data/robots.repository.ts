import mongoose, { model, Schema } from 'mongoose';
import { ProtoRobot, Robot } from '../interfaces/robot.js';
import { id } from './data.js';

export const robotSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    image: String,
    speed: Number,
    endurance: Number,
    creationDate: String,
    owner: mongoose.Types.ObjectId,
});

export const RobotModel = model('Robot', robotSchema, 'Robots');

export async function repoGetAll() {
    const robots = await RobotModel.find();
    return robots;
}

export async function repoGet(id: id) {
    const result = await RobotModel.findById(id);
    if (!result) {
        throw new Error('Not found id');
    }
    return result as ProtoRobot;
}

export async function repoPost(data: ProtoRobot) {
    console.log(data);
    const result = await RobotModel.create({
        ...data,
        _id: new mongoose.Types.ObjectId(),
    });
    return result as ProtoRobot;
}

export async function repoPatch(data: Partial<Robot>) {
    const result = await RobotModel.findByIdAndUpdate({ _id: data._id }, data, {
        new: true,
    });
    if (!result) throw new Error('Not found id');
    return result as ProtoRobot;
}

export async function repoDelete(id: id) {
    if (!id) throw new Error('Not found id');
    const returnData = await RobotModel.findById({ _id: id });
    const result = await RobotModel.findByIdAndDelete({ _id: id });
    if (!result === null) throw new Error('Not found id');
    return returnData as ProtoRobot;
}
