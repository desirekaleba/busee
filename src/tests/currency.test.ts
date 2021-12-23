import supertest from 'supertest';
import { App } from '../app';
import { routes } from '../routes';

import secrets from '../utils/secrets';

import { OK } from '../constants/statusCodes';

import { initializeDB } from '../database/initializeDB';

beforeAll(async () => {
  jest.setTimeout(50000);
  await initializeDB();
});

describe('Currency', () => {
  describe('GET /currency', () => {
    test('Should get empty currencies', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).get(`${secrets.URL_PREFIX}/currency`);
      expect((await res).status).toBe(OK);
      expect((await res).body.status).toBe('success');
      expect((await res).body.data).toBeTruthy();
      expect((await res).body.data.length).toBe(0);
    });
  });
});
