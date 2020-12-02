import { AccountResType, AccountType } from '../entity/accountTypes';

export type UpdateType = {
    id: number;
    email?: string;
    phone_number?: number;
    password?: string;
};

export type dbFunctions = {
    findById: (id: number) => Promise<AccountResType>;
    findByEmail: (email: string) => Promise<AccountType | undefined>;
    insert: (account: AccountType) => Promise<AccountResType>;
    update: (updateInputs: UpdateType) => Promise<AccountResType>;
    findByPhoneNumber?: (id: number) => Promise<AccountType | undefined>;
    getPassword?: (id: string) => Promise<string | undefined>;
    customQuery: (
        text: string,
        values: string[]
    ) => Promise<AccountType | undefined>;
    deleteAccount: (id: number) => Promise<boolean>;
};
