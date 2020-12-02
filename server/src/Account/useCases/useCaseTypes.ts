import { QueryResult } from 'pg';
import { AccountResType, AccountType } from '../entity/accountTypes';

export type dbFunctions = {
    findById: (id: number) => Promise<AccountResType>;
    findByEmail: (email: string) => Promise<AccountType | undefined>;
    insert: (account: AccountType) => Promise<AccountType | undefined>;
    update: (
        id: number,
        col: 'email' | 'password' | 'phone_number',
        newValue: string | number
    ) => Promise<QueryResult<any>>;
    findByPhoneNumber?: (id: number) => Promise<AccountType | undefined>;
    getPassword?: (id: string) => Promise<string | undefined>;
    customQuery: (
        text: string,
        values: string[]
    ) => Promise<AccountType | undefined>;
    deleteAccount: (id: number) => Promise<boolean>;
};
