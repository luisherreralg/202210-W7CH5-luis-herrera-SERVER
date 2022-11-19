import { model, Schema } from 'mongoose';
import { ProtoRobot, Robot } from '../interfaces/robot.js';
import { id } from './data.js';

export const thingSchema = new Schema({
    id: String,
    name: String,
    image: String,
    speed: Number,
    endurance: Number,
    creationDate: Number,
});

export const RobotModel = model('Robot', thingSchema, 'Robots');

export async function repoGetAll() {
    const things = await RobotModel.find();
    return things;
}

export async function repoGet(id: id) {
    const result = await RobotModel.findById(id);
    if (!result) throw new Error('Not found id');
    return result as Robot;
}

export async function repoPost(data: ProtoRobot) {
    const result = await RobotModel.create(data);
    return result as Robot;
}

export async function repoPatch(id: id, data: Partial<Robot>) {
    const result = await RobotModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    if (!result) throw new Error('Not found id');
    return result as Robot;
}

export async function repoDelete(id: id) {
    const result = await RobotModel.findByIdAndDelete(id);
    if (result === null) throw new Error('Not found id');
    return;
}
