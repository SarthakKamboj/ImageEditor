import { Pool, PoolClient } from 'pg';
import { QueryParamsType } from './dbQueryParamsType';

export const connect = async (pool: Pool) => {
    return await pool.connect();
};

export const begin = async (client: PoolClient) => {
    client.query('BEGIN');
};

export const query = async (
    client: PoolClient,
    queryParams: QueryParamsType
) => {
    return await client.query(queryParams);
};

export const commit = async (client: PoolClient) => {
    await client.query('COMMIT');
    client.release();
};

export const rollback = async (client: PoolClient) => {
    await client.query('ROLLBACK');
    client.release();
};
