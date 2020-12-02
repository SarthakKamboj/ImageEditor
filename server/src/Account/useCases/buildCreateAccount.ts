import { makeAccount } from '../entity';
import { AccountType, AccountResType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';

type BuildCreateAccountInputs = {
    dbFuncs: dbFunctions;
    hash: (str: string) => Promise<string>;
};

export const buildCreateAccount = (
    buildCreateAccountInputs: BuildCreateAccountInputs
) => {
    const {
        dbFuncs: { customQuery, insert },
        hash,
    } = buildCreateAccountInputs;

    return async (accountInputs: AccountType): Promise<AccountResType> => {
        const { email, password, phone_number } = accountInputs;

        const text = 'select * from account where email = $1 limit 1';
        const values = [email];
        const accountDb = await customQuery(text, values);

        if (accountDb) {
            return {
                errors: [
                    {
                        source: 'account creation',
                        message:
                            'account with this email or username already exists',
                    },
                ],
            };
        }

        const hashedPassword = await hash(password);
        const accountRes = makeAccount({
            email,
            password: hashedPassword,
            phone_number,
        });
        const { account, errors } = accountRes;

        if (account === undefined) {
            return {
                errors,
            };
        }

        return {
            account: await insert({
                email,
                phone_number,
                password: account.password,
                created_at: account.created_at,
                updated_at: account.updated_at,
            }),
        };
    };
};
