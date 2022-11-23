import mongoose from 'mongoose';

export type ProtoRobot = {
    name?: string;
    image?: string;
    speed?: number;
    endurance?: number;
    creationDate?: string;
    owner?: string;
};

export type Robot = {
    _id: mongoose.Types.ObjectId;
    name: string;
    image: string;
    speed: number;
    endurance: number;
    creationDate: string;
};

export type Robots = {
    robots: Robot[];
};
