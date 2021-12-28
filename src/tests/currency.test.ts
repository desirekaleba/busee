import supertest from 'supertest';
import { App } from '../app';
import { routes } from '../routes';

import secrets from '../utils/secrets';

import { BAD_REQUEST, CREATED, OK } from '../constants/statusCodes';

import { initializeDB } from '../database/initializeDB';
import { createCurrencyData } from '../mocks/currency.mock';

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

  describe('POST /currency', () => {
    test('Should add a currency', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/currency`).send(createCurrencyData);
      expect((await res).status).toBe(CREATED);
      expect((await res).body.status).toBe('success');
      expect((await res).body.message).toBe('Currency created successfully.');
      expect((await res).body.data.name).toBe(createCurrencyData.name);
    });

    test('Should fail to add a currency due to duplication', async () => {
      const app = new App(routes).getServer();
      const res = supertest(app).post(`${secrets.URL_PREFIX}/currency`).send(createCurrencyData);
      expect((await res).status).toBe(BAD_REQUEST);
      expect((await res).body.status).toBe('error');
      expect((await res).body.message).toBe(
        `A currency with such a name(${createCurrencyData.name}) or initials(${createCurrencyData.initials}) already exists.`,
      );
    });
  });
});
