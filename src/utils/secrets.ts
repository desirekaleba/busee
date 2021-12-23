import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  PROD_DB,
  TEST_DB,
  NODE_ENV,
  JWT_SECRET_KEY,
  URL_PREFIX,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
} = process.env;

const requiredCredentials = [
  'DB_USER',
  'DB_HOST',
  'DB_PASSWORD',
  'DB_PORT',
  'DEV_DB',
  'JWT_SECRET_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_SERVICE_SID',
  'URL_PREFIX',
];

// eslint-disable-next-line no-restricted-syntax
for (const credential of requiredCredentials) {
  if (!process.env[credential]) {
    logger.error(`Missing required credential: ${credential}`);
    process.exit(1);
  }
}

export default {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  TEST_DB,
  PROD_DB,
  NODE_ENV,
  JWT_SECRET_KEY,
  URL_PREFIX,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
};
