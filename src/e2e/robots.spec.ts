import request from 'supertest';
import { app } from '../app';
import { dbConnect } from '../db/db.connect';
import { dbDisconnect } from '../db/db.disconnect';
import { setRobotCollection, setUserCollection } from '../mocks/mocks';
import { createToken } from '../services/auth';
// import createDebug from 'debug';
// const debug = createDebug('W8:e2e:robot.spec');

const payload = (idUser: string) => {
    return {
        id: idUser,
        name: 'testName',
        role: 'testRole',
    };
};

describe('Given the "app" with "/robots" route', () => {
    let token: string;
    let userIds: string[];
    let robotIds: string[];

    beforeAll(async () => {
        await dbConnect();
    });

    beforeEach(async () => {
        userIds = await setUserCollection();
        robotIds = await setRobotCollection();
        token = createToken(payload(userIds[0]));
    });

    afterAll(async () => {
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
        const response = await request(app)
            .get('/robots/637d184505dc2717a774060c')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test('Get correct id', async () => {
        const response = await request(app)
            .get(`/robots/${robotIds[0]}`)
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

    test('Patch without auth', async () => {
        const response = await request(app).patch('/robots');
        expect(response.status).toBe(503);
    });

    test('Patch with auth but wrong id', async () => {
        const response = await request(app)
            .patch('/robots/637d184505dc2717a774060c')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test('Patch with auth', async () => {
        const updatedRobot = {
            _id: robotIds[0],
            name: 'update',
            image: 'update',
            speed: 0,
            endurance: 0,
            creationDate: 0,
        };

        const response = await request(app)
            .patch('/robots')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedRobot);

        expect(response.status).toBe(201);
    });

    test('Delete without auth', async () => {
        const response = await request(app).delete('/robots');
        expect(response.status).toBe(404);
    });

    test('Delete with auth but malformed id', async () => {
        const response = await request(app)
            .delete('/robots/23')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(503);
    });

    test('Delete with auth but wrong id', async () => {
        const response = await request(app)
            .delete('/robots/637d184505dc2717a774060c')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    test('Delete with auth', async () => {
        const response = await request(app)
            .delete(`/robots/${robotIds[0]}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });
});
