import { AccountResType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';

type BuildVerifyPasswordType = {
    dbFuncs: dbFunctions;
    verify: (password: string, hashedPassword: string) => Promise<boolean>;
};

type VerifyPasswordInputType = {
    id: number;
    password: string;
};

export const buildVerifyPassword = (
    buildVerifyPasswordInputs: BuildVerifyPasswordType
) => {
    const {
        dbFuncs: { findById },
        verify,
    } = buildVerifyPasswordInputs;

    return async (
        verifyPasswordInputs: VerifyPasswordInputType
    ): Promise<AccountResType> => {
        const { id, password } = verifyPasswordInputs;
        const { account } = await findById(id);
        if (account === undefined) {
            return {
                errors: [
                    {
                        source: 'password verification',
                        message: 'account with this id does not exist',
                    },
                ],
            };
        }
        const { password: hashedOldPassword } = account;
        const isSamePassword = await verify(password, hashedOldPassword);
        if (!isSamePassword) {
            return {
                errors: [
                    {
                        source: 'password verification',
                        message: 'incorrect password',
                    },
                ],
            };
        }

        return { account };
    };
};
