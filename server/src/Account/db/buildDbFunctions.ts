import { Pool } from 'pg';
import { knex } from '../../Pool';
import { AccountResType, AccountType } from '../entity/accountTypes';
import { dbFunctions, UpdateType } from '../useCases/useCaseTypes';
import { QueryParamsType } from './dbQueryParamsType';

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
            const source = 'get account by id';
            const accounts = await knex
                .select('*')
                .from('account')
                .where({ id })
                .returning('*')
                .limit(1);

            const account = accounts[0] as AccountType;

            if (!account) {
                return {
                    errors: [
                        {
                            source,
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
            const res = await knex.del().from('account').where({ id });

            if (res === 0) {
                return false;
            }

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

    async function update(updateInputs: UpdateType): Promise<AccountResType> {
        const { id, ...newVals } = updateInputs;
        const source = 'update';

        let accounts = await knex('account')
            .update(newVals)
            .where({ id })
            .returning('*')
            .limit(1);

        if (accounts.length === 0) {
            return {
                errors: [
                    {
                        source,
                        message: 'account with this id does not exist',
                    },
                ],
            };
        }

        const account = accounts[0] as AccountType;

        return {
            account,
        };
    }

    async function insert(accountInputs: AccountType): Promise<AccountResType> {
        const { email, password, phone_number } = accountInputs;
        const source = 'insert';

        try {
            const accounts = await knex
                .insert({ email, password, phone_number })
                .into('account')
                .returning('*')
                .limit(1);
            const account = accounts[0] as AccountType;
            return {
                account,
            };
        } catch (e: any) {
            const code = parseInt(e.code);
            if (code === 23505) {
                return {
                    errors: [
                        {
                            source,
                            message: 'this email already exists',
                        },
                    ],
                };
            }
        }
        return {};
    }

    async function findByEmail(
        email: string
    ): Promise<AccountType | undefined> {
        try {
            const accounts = await knex
                .select('*')
                .from('account')
                .where({ email })
                .returning('*')
                .limit(1);

            const account = accounts[0] as AccountType;

            if (!account) {
                return undefined;
            }

            return account;
        } catch (err: any) {
            console.error(err.stack);
            return;
        }
    }
};
