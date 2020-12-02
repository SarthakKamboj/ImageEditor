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
        dbFuncs: { insert },
        hash,
    } = buildCreateAccountInputs;

    return async (accountInputs: AccountType): Promise<AccountResType> => {
        const { email, password, phone_number } = accountInputs;
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

        const insertRes = await insert({
            email,
            phone_number,
            password: account.password,
            created_at: account.created_at,
            updated_at: account.updated_at,
        });

        return insertRes;
    };
};
