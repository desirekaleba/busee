import supertest from 'supertest';
import { App } from '../app';
import { routes } from '../routes';

import secrets from '../utils/secrets';

import { signupUser } from '../mocks/auth.mock';

import { BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';

import { initializeDB } from '../database/initializeDB';

beforeAll(async () => {
  jest.setTimeout(50000);
  await initializeDB();
});

describe('User', () => {
  describe('GET /user', () => {
    test('Should get empty users', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user`);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeTruthy();
      expect((await res).body.data.length).toBe(0);
    });

    test('Should fail to get User By Email due to user not found', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/user/getByEmail`).send({ email: 'des@gmail.com' });
      expect((await res).status).toBe(NOT_FOUND);
      expect((await res).body.status).toBe('error');
    });
  });

  describe('POST /user/getByEmail', () => {
    test('Should signup', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signup`).send(signupUser);
      expect((await res).status).toBe(CREATED);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.data.email).toBe(signupUser.email);
    });

    test('Should get one user', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user`);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeTruthy();
      expect((await res).body.data.length).toBe(1);
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
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/1/getById`);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeDefined();
    });

    test('Should not return a user due to user id not found', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/111/getById`);
      expect((await res).status).toBe(NOT_FOUND);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });
  });

  describe('GET /user/me', () => {
    let token: string = 'Bearer ';
    test('Should signin', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signin`).send(signupUser);
      expect((await res).status).toBe(OK);
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.status).toBe('success');

      token += (await res).body.data.token;
    });

    test('Should return the current user', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/me`).set('Authorization', token);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeDefined();
    });

    test('Should fail to get the user due to missing token', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/user/me`);
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });
  });

  describe('PUT /user/:id', () => {
    let token: string = 'Bearer ';
    test('Should signin', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signin`).send(signupUser);
      expect((await res).status).toBe(OK);
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.status).toBe('success');

      token += (await res).body.data.token;
    });

    test('Should update the user', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .put(`${secrets.URL_PREFIX}/user/1`)
        .send({ isAdmin: true })
        .set('Authorization', token);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeDefined();
      expect((await res).body.data.isAdmin).toBe(true);
    });

    test('Should fail to update the user due to missing token', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).put(`${secrets.URL_PREFIX}/user/1`).send({ isAdmin: true });
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });

    test('Should fail to update the user due to wrong token', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .put(`${secrets.URL_PREFIX}/user/1`)
        .send({ isAdmin: true })
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM4MjE2NjYwLCJleHAiOjE2MzkwODA2NjB9.MkUJMl5skNqZ9XlYm_EHguoIANH7qKdxyeULBOjLFzY',
        );
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });
  });

  describe('DELETE /user/:id', () => {
    let token: string = 'Bearer ';
    test('Should signin', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/auth/signin`).send(signupUser);
      expect((await res).status).toBe(OK);
      expect((await res).body.data.token).toBeTruthy();
      expect((await res).body.status).toBe('success');

      token += (await res).body.data.token;
    });

    test('Should fail to delete the user due to missing token', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).delete(`${secrets.URL_PREFIX}/user/1`);
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });
    test('Should fail to delete the user due to wrong token', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app)
        .delete(`${secrets.URL_PREFIX}/user/1`)
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM4MjE2NjYwLCJleHAiOjE2MzkwODA2NjB9.MkUJMl5skNqZ9XlYm_EHguoIANH7qKdxyeULBOjLFzY',
        );
      expect((await res).status).toBe(UNAUTHORIZED);
      expect((await res).body.status).toBe('error');
      expect((await res).body.data).not.toBeDefined();
    });

    test('Should delete the user', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).delete(`${secrets.URL_PREFIX}/user/1`).set('Authorization', token);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeDefined();
      expect((await res).body.data.isAdmin).toBeDefined();
    });
  });
});
