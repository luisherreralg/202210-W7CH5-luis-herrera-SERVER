import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CustomError } from './interfaces/error.js';
import { robotRouter } from './router/robot.js';
import { userRouter } from './router/users.js';

export const app = express();
app.disable('x-powered-by');
const corsOptions = {
    origin: '*',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
const template = `
    <body style='align'>
        <h1>API REST ROBOTS</h1>
        <h2>Endpoints</h2>
        <ul>
            <li><p>[GET] /robots -> devuelve un array con todos los robots de la BD</p></li>
            <li><p>[GET] /robots/:idRobot -> devuelve un robot de la BD por id</p></li>
            <li><p>/[POST*] /robots/create -> recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado</p></li>
            <li><p>[PATCH*] /robots/update -> recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado</p></li>
            <li><p>[DELETE*] /robots/delete/:idRobot -> elimina de la BD un robot por id y devuelve un objeto con la id</p></li>
        </ul>
    </body>`;

app.get('/', (_req, res) => {
    res.send(template).end();
});
app.use('/users', userRouter);
app.use('/robots', robotRouter);

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
        console.log(
            error.name,
            error.statusCode,
            error.statusMessage,
            error.message
        );
        let status = error.statusCode || 500;
        if (error.name === 'ValidationError') {
            status = 406;
        }
        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
