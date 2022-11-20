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
});

export const RobotModel = model('Robot', robotSchema, 'Robots');

export async function repoGetAll() {
    const robots = await RobotModel.find();
    robots.map((robot) => {
        console.log(robot._id);
    });

    return robots;
}

export async function repoGet(id: id) {
    const result = await RobotModel.findById(id);
    if (!result) throw new Error('Not found id');
    return result as ProtoRobot;
}

export async function repoPost(data: ProtoRobot) {
    const result = await RobotModel.create({
        ...data,
        _id: new mongoose.Types.ObjectId(),
    });
    return result as ProtoRobot;
}

export async function repoPatch(data: Partial<Robot>) {
    console.log('HOLA');
    console.log(data._id);
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
    console.log('result', result);
    console.log('returnData', returnData);
    if (!result === null) throw new Error('Not found id');
    return returnData as ProtoRobot;
}
