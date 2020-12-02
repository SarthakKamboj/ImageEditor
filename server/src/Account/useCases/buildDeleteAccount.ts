import { ErrorType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';

type BuildDeleteAccountType = {
    dbFuncs: dbFunctions;
};

type DeleteAccountResType = {
    errors?: ErrorType[];
    deleted?: boolean;
};

export const buildDeleteAccount = ({
    dbFuncs: { deleteAccount },
}: BuildDeleteAccountType) => {
    return async (id: number): Promise<DeleteAccountResType> => {
        const source = 'account deletion';
        const deleted = await deleteAccount(id);
        if (!deleted) {
            return {
                deleted: false,
                errors: [
                    {
                        source,
                        message: 'account with this id does not exist',
                    },
                ],
            };
        }
        return {
            deleted,
        };
    };
};
