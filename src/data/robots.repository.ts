import mongoose, { model, mongo, Schema } from 'mongoose';
import { ProtoRobot, Robot } from '../interfaces/robot.js';
import { id } from './data.js';

export const robotSchema = new Schema({
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
    const result = await RobotModel.create(data);
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
    const result = await RobotModel.findByIdAndDelete({ _id: id });
    if (result === null) throw new Error('Not found id');
    return;
}
