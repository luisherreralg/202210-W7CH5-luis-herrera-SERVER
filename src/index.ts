import http from 'http';
import { app } from './app.js';
import { PORT, URL } from './config.js';
import { dbConnect } from './db/db.connect.js';
import { CustomError } from './interfaces/error.js';

// Importamos el debugCreator
import debugCreator from 'debug';
// Creamos una instancia de debugCreator con el nombre de nuestro archivo
const debug = debugCreator('W7CH5:app');

const port = PORT || 3300;
const server = http.createServer(app);
server.on('listening', () => {
    const addr = server.address();
    if (addr === null) return;
    let bind: string;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `${URL}${addr?.port}`
                : `port ${addr?.port}`;
    }
    console.log(`Listening on ${bind}`);
});

server.on('error', (error: CustomError, response: http.ServerResponse) => {
    response.statusCode = error.statusCode;
    response.statusMessage = error.statusMessage;
    response.write(error.message);
    response.end();
});

dbConnect()
    .then(() => server.listen(port))
    .catch((error) => server.emit(error));
