export type ProtoRobot = {
    name?: string;
    image?: string;
    speed?: number;
    endurance?: number;
    creationDate?: string;
    owner?: string;
};

export type Robot = {
    _id: string;
    name: string;
    image: string;
    speed: number;
    endurance: number;
    creationDate: string;
};

export type Robots = {
    robots: Robot[];
};
