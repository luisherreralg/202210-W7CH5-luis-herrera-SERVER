import mongoose from 'mongoose';
import { RobotModel } from '../data/robots.repository';
import { userModel } from '../interfaces/user';

export const mockUsers = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'Pepe',
        email: '',
        passwd: '$2a$10$KVw1GyjA/kwmqmAoofS4BONQyO2WD7mfzv0SB9Ux0Tcl4qFs/ivb2',
        role: 'user',
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'Juan',
        email: '',
        passwd: 'Juan',
        role: 'user',
    },
];

export const mockRobots = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'test0',
        image: 'test0',
        speed: 0,
        endurance: 0,
        creationDate: 0,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'test1',
        image: 'test1',
        speed: 1,
        endurance: 1,
        creationDate: 1,
    },
];

export const newUser = {
    name: 'newUser',
    email: '',
    passwd: '',
    role: 'user',
};

export const setUserCollection = async () => {
    await userModel.deleteMany();
    await userModel.insertMany(mockUsers);
    const data = await userModel.find();
    const testIds = data.map((user) => user._id.toString());
    return testIds;
};

export const setRobotCollection = async () => {
    await RobotModel.deleteMany();
    await RobotModel.insertMany(mockRobots);
    const data = await RobotModel.find();
    const testIds = data.map((robot) => robot._id.toString());
    return testIds;
};
