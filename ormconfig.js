/* eslint-disable prettier/prettier */
require('dotenv').config();
const path = require('path');

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DEV_DB, PROD_DB, TEST_DB, NODE_ENV } = process.env;

const dir = NODE_ENV === 'production' ? path.join(__dirname, 'build') : path.join(__dirname, 'src');

// eslint-disable-next-line no-nested-ternary
const database = NODE_ENV === 'production' ? PROD_DB : NODE_ENV === 'test' ? TEST_DB : DEV_DB;

module.exports = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database,
    synchronize: NODE_ENV !== 'production',
    logging: NODE_ENV !== 'production',
    entities: [`${dir}/database/entity/**/*.{ts,js}`],
    migrations: [`${dir}/database/migrations/**/*.{ts,js}`],
    subscribers: [`${dir}/database/subscriber/**/*.{ts,js}`],
    seeds: [`${dir}/database/seeds/**/*.{ts,js}`],
    factories: [`${dir}/database/factories/**/*.{ts,js}`],
    cli: {
        migrationsDir: `${dir}/database/migrations`,
        entitiesDir: `${dir}/database/entity`,
        subscribersDir: `${dir}/database/subscriber`,
    },
};
