import request from 'supertest';
import { app } from '../app';
import { dbConnect } from '../db/db.connect';
import { dbDisconnect } from '../db/db.disconnect';
import { userModel } from '../interfaces/user';
import { createToken, TokenPayload } from '../services/auth';

const payload = (idUser: string) => {
    return {
        id: idUser,
        name: 'testName',
        role: 'testRole',
    };
};

const mockData = [
    {
        name: 'Pepe',
        email: '',
        password: '',
        role: 'user',
    },
    {
        name: 'Juan',
        email: '',
        password: '',
        role: 'user',
    },
];

const setCollection = async () => {
    await await userModel.deleteMany();
    await userModel.insertMany(mockData);
    const data = await userModel.find();
    const testIds = data.map((user) => user._id.toString());
    return testIds;
};

describe('Given the "app" with "/robots" route', () => {
    let token: string;
    let ids: string[];

    beforeEach(async () => {
        await dbConnect();
        ids = await setCollection();
        token = createToken(payload(ids[0]));
    });

    afterEach(async () => {
        await dbDisconnect();
    });

    test('GetAll', async () => {
        /**
         * * Se puede hacer de esta manera mas corta o usar el expect de toda la vida
         * ? request(app).get('/robots').expect(200)
         */

        // Nostros lo vamos a hacer con la estructura que teníamos hasta ahora
        const response = await request(app)
            .get('/robots')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });

    test('GetId malformed id', async () => {
        const response = await request(app).get('/robots/23');
        expect(response.status).toBe(503);
    });

    test('Get wrong id', async () => {
        const response = await request(app).get(
            '/robot/637d184505dc2717a774060c'
        );
        expect(response.status).toBe(404);
    });

    test('Get correct id', async () => {
        const response = await request(app)
            .get(`/robot/${ids[0]}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
    });

    test('Post without auth', async () => {
        /**
         * Como sabemos que sin auth no va a pasar, le ponemos un objeto vacío para olvidarnos
         * Pero en send habría que meterle lo que le queremos pasar dentro de la request
         */
        const response = await request(app).post('/robots').send({});
        expect(response.status).toBe(503);
    });

    test('Post with auth', async () => {
        const response = await request(app)
            .post('/robots')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });
});

// get('/robots/');
// get('/robots/:id');
// post('/robots/');
// patch('/robots/');
// delete '/robots/:id';
