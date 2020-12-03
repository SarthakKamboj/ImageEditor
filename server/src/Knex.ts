const Knex = require('knex');
require('dotenv').config();

export const knex = Knex({
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    },
    pool: { min: 0, max: 7 },
    debug: true,
});
