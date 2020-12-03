import { AccountResType, AccountType } from '../entity/accountTypes';
import { dbFunctions, UpdateType } from '../useCases/useCaseTypes';
import { handleDbError } from './dbErrorHandler';

export const buildDbFunctions = (knex: any): dbFunctions => {
    customQuery('select * from account where id = ?', [19]).then((res) =>
        console.log(res)
    );
    return {
        insert,
        findByEmail,
        customQuery,
        update,
        deleteAccount,
        findById,
    };

    async function findById(id: number): Promise<AccountResType> {
        const source = 'get account by id';
        try {
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
                        source,
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
        values: Array<string | number>
    ): Promise<AccountType[] | undefined> {
        try {
            const res = await knex.raw(text, values);
            const accounts = res.rows;
            return accounts;
        } catch (err: any) {
            console.log(err);
        }
        return;
    }

    async function update(updateInputs: UpdateType): Promise<AccountResType> {
        const source = 'update';

        try {
            const { id, ...newVals } = updateInputs;

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
        } catch (e: any) {
            const errors = handleDbError(source, e);
            return {
                errors,
            };
        }
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
            const errors = handleDbError(source, e);
            return {
                errors,
            };
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
