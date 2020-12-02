import { AccountResType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';
type BuildGetAccountType = {
    dbFuncs: dbFunctions;
};

export const buildGetAccount = (buildGetAccountInputs: BuildGetAccountType) => {
    const {
        dbFuncs: { findById },
    } = buildGetAccountInputs;

    return async (id: number): Promise<AccountResType> => {
        if (!id) {
            return {
                errors: [
                    {
                        source: 'get account by id',
                        message: 'id is undefined',
                    },
                ],
            };
        }

        return await findById(id);
    };
};
