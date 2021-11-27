import supertest from 'supertest';
import { App } from '../app';
import { routes } from '../routes';

import secrets from '../utils/secrets';

import { signinData, signupData } from '../mocks/auth.mock';

import { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } from '../constants/statusCodes';

import { initializeDB } from '../database/initializeDB';

beforeAll(async () => {
  jest.setTimeout(50000);
  await initializeDB();
});

describe('Auth', () => {
  describe('POST /auth/signup', () => {
    test('Should signup', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signup`).send(signupData);
      expect((await res).status).toBe(CREATED);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.data.email).toBe(signupData.email);
    });

    test('Should fail to signup due to missing password field', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signup`)
        .send({ email: signupData.email, password: '' });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe('password is not allowed to be empty');
    });

    test('Should fail to signup due to missing email field', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signup`)
        .send({ email: '', password: signupData.password });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe('email is not allowed to be empty');
    });

    test('Should fail to signup due duplicate email', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signup`).send(signupData);
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`A user with email address '${signupData.email}' already exists.`);
    });

    test('Should fail to signup due to wrong email format', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signup`)
        .send({ email: 'desirekalebagmail.com', password: signupData.password });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`email must be a valid email`);
    });

    test('Should fail to signup due to wrong password length', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signup`)
        .send({ email: signupData.email, password: '34fg' });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`password length must be at least 6 characters long`);
    });
  });

  describe('POST /auth/signin', () => {
    test('Should signin', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signin`).send(signinData);
      expect((await res).status).toBe(OK);
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.status).toBe('success');
    });

    test('Should not signin due to wrong email', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signin`)
        .send({ email: 'desire@gmail.com', password: signinData.password });
      expect((await res).status).toBe(NOT_FOUND);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`User with 'desire@gmail.com' not found.`);
    });

    test('Should not signin due to missing email', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signin`)
        .send({ email: '', password: signinData.password });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`email is not allowed to be empty`);
    });

    test('Should not signin due to wrong password', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signin`)
        .send({ email: signinData.email, password: 'werd34' });
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`Incorrect password.`);
    });

    test('Should fail to signin due to wrong email format', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signin`)
        .send({ email: 'desirekalebagmail.com', password: signinData.password });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`email must be a valid email`);
    });

    test('Should fail to signin due to wrong password length', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .post(`${secrets.URL_PREFIX}/auth/signin`)
        .send({ email: signinData.email, password: '34fg' });
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).toBeUndefined();
      expect((await res).body.message).toBe(`password length must be at least 6 characters long`);
    });
  });
});
