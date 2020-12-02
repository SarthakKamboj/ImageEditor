import { AccountResType, AccountType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';

type BuildLoginAccountType = {
    dbFuncs: dbFunctions;
    verify: (password: string, hashedPassword: string) => Promise<boolean>;
};

type LoginAccountType = {
    email: string;
    password: string;
};

export const buildLoginAccount = ({
    dbFuncs: { findByEmail },
    verify,
}: BuildLoginAccountType) => {
    return async ({
        password,
        email,
    }: LoginAccountType): Promise<AccountResType> => {
        if (email === undefined) {
            return {
                errors: [
                    {
                        source: 'login',
                        message: 'neither email or password given',
                    },
                ],
            };
        }
        let account: AccountType | undefined;
        if (email) {
            account = await findByEmail(email);
        }

        if (account === undefined) {
            return {
                errors: [
                    {
                        source: 'login',
                        message: 'account with this email does not exist',
                    },
                ],
            };
        }

        const { password: hashedPassword } = account;

        const isSamePassword = await verify(password, hashedPassword);

        if (!isSamePassword) {
            return {
                errors: [
                    {
                        source: 'login',
                        message: 'password is incorrect',
                    },
                ],
            };
        }

        return {
            account,
        };
    };
};
