import { Pool } from 'pg';
import { AccountResType, AccountType } from '../entity/accountTypes';
import { dbFunctions } from '../useCases/useCaseTypes';
import {
    begin,
    commit,
    connect,
    query,
    rollback,
} from '../../utils/dbHelperFuncs';
import { QueryParamsType } from '../../utils/dbQueryParamsType';

export const buildDbFunctions = ({ pool }: { pool: Pool }): dbFunctions => {
    return {
        insert,
        findByEmail,
        customQuery,
        update,
        deleteAccount,
        findById,
    };

    async function findById(id: number): Promise<AccountResType> {
        try {
            const queryParams: QueryParamsType = {
                text: 'select * from account where id = $1',
                values: [id],
            };

            const res = await pool.query(queryParams);
            const account = res.rows[0] as AccountType;

            if (!account) {
                return {
                    errors: [
                        {
                            source: 'get account by id',
                            message: 'account with this id does not exist',
                        },
                    ],
                };
            }

            return {
                account,
            };
        } catch (e) {
            console.log(e);
            return {
                errors: [
                    {
                        source: 'get account by id',

                        message: e.message,
                    },
                ],
            };
        }
    }

    async function deleteAccount(id: number): Promise<boolean> {
        try {
            const queryParams: QueryParamsType = {
                text: 'delete from account where id = $1',
                values: [id],
            };
            await pool.query(queryParams);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async function customQuery(
        text: string,
        values: string[]
    ): Promise<AccountType | undefined> {
        const queryParams: QueryParamsType = {
            text,
            values,
        };
        try {
            const res = await pool.query(queryParams);
            return res.rows[0] as AccountType;
        } catch (err: any) {
            console.log(err.stack);
        }
        return;
    }

    async function update(
        id: number,
        col: 'email' | 'password' | 'phone_number',
        newValue: string | number
    ) {
        const queryParams: QueryParamsType = {
            text: `update account set ${col} = $1, updated_at = NOW() where id = $2 returning *`,
            values: [newValue, id],
        };
        return await pool.query(queryParams);
    }

    async function insert({
        email,
        password,
        phone_number,
    }: // username,
    AccountType): Promise<AccountType | undefined> {
        const client = await connect(pool);
        try {
            await begin(client);
            const queryParams: QueryParamsType = {
                text:
                    'insert into account (email, password, phone_number) values($1,$2,$3) returning *',
                values: [email, password, phone_number],
            };
            const res = await query(client, queryParams);
            const insertedData = res.rows[0] as AccountType;
            await commit(client);
            return insertedData;
        } catch (err: any) {
            await rollback(client);
            return;
        }
    }

    async function findByEmail(
        email: string
    ): Promise<AccountType | undefined> {
        const client = await pool.connect();

        try {
            const queryParams: QueryParamsType = {
                text: 'select * from account where email = $1 limit 1',
                values: [email],
            };
            await client.query('BEGIN');
            const res = await client.query(queryParams);
            const account = res.rows[0] as AccountType;
            await client.query('COMMIT');

            client.release();
            return account;
        } catch (err: any) {
            await client.query('ROLLBACK');
            console.error(err.stack);
            client.release();
            return;
        }
    }
};
