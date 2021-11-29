import supertest from 'supertest';
import { App } from '../app';
import { routes } from '../routes';

import secrets from '../utils/secrets';

import { signupUser } from '../mocks/auth.mock';

import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants/statusCodes';

import { initializeDB } from '../database/initializeDB';

beforeAll(async () => {
  jest.setTimeout(50000);
  await initializeDB();
});

describe('User', () => {
  describe('POST /user/getByEmail', () => {
    test('Should signup', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signup`).send(signupUser);
      expect((await res).status).toBe(CREATED);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.data.email).toBe(signupUser.email);
    });

    test('Should get User By Email', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/user/getByEmail`).send({ email: signupUser.email });
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeTruthy();
      expect((await res).body.data.email).toBe(signupUser.email);
    });

    test('Should fail to get User By Email due to user not found', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/user/getByEmail`).send({ email: 'des@gmail.com' });
      expect((await res).status).toBe(NOT_FOUND);
      expect((await res).body.status).toBe('error');
    });

    test('Should fail to get User By Email due to missing email', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/user/getByEmail`).send({ email: '' });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.message).toBe('email is not allowed to be empty');
    });

    test('Should fail to get User By Email due to wrong email format', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/user/getByEmail`)
        .send({ email: 'desirekalebaatgemail.com' });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.message).toBe('email must be a valid email');
    });
  });

  describe('GET /user/:id', () => {
    test('Should return a user', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/1`);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeDefined();
    });

    test('Should not return a user due to user id not found', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/111`);
      expect((await res).status).toBe(NOT_FOUND);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });
  });
});
