import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

// Creamos una función que cree un token
export const createToken = (payload: { userName: string }) => {
    // *  Hace falta gestionar el caso de que no reciba el SECRET o que no sea string
    if (typeof SECRET !== 'string') {
        throw new Error('No hay secret');
    }

    // * Sign es para "firmar" / crear un token
    //  Recibe 3 parámetros:
    // 1. El payload (datos que queremos guardar en el token)
    // 2. La firma secreta
    // 3. Opciones (expiración, etc) (OPCIONAL) EJEMPLO:
    return jwt.sign(payload, SECRET /*,{ expiresIn: '1h' }*/);
};

// Creamos una función que verifique un token
export const readToken = (token: string) => {
    // *  Hace falta gestionar el caso de que no reciba el SECRET o que no sea string
    if (typeof SECRET !== 'string') throw new Error('No hay secret');

    // * verify es para verificar un token
    //  Recibe 2 parámetros:
    // 1. El token
    // 2. La firma secreta

    const payload = jwt.verify(token, SECRET);
    // *  Hace falta gestionar el caso de que no reciba el payload
    // El payload es el objeto que se guardó en el token
    // Por eso no puede ser un string
    if (typeof payload === 'string') throw new Error('No es un payload');

    // Hacemos return del payload
    return payload;
};
