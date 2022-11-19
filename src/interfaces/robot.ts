export type ProtoRobot = {
    name?: string;
    image?: string;
    speed?: number;
    endurance?: number;
    creationDate?: number;
};

export type Robot = {
    id: string;
    name: string;
    image: string;
    speed: number;
    endurance: number;
    creationDate: number;
};

export type Robots = {
    robots: Robot[];
};
