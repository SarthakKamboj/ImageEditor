import { buildCreateAccount } from './buildCreateAccount';
import { dbFunctions as dbFuncs } from '../db';
import bcrypt from 'bcrypt';
import { buildLoginAccount } from './buildLoginAccount';
import { buildUpdateAccount } from './buildUpdateUseCases';
import { buildVerifyPassword } from './buildVerifyPassword';
import { isValidPhoneNumber } from '../entity';
import { buildDeleteAccount } from './buildDeleteAccount';
import { buildGetAccount } from './buildGetAccount';

const hash = async (str: string) => {
    const hashedStr = await bcrypt.hash(str, 10);
    return hashedStr;
};

const verify = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

const createAccount = buildCreateAccount({ dbFuncs, hash });
const loginAccount = buildLoginAccount({ dbFuncs, verify });
const deleteAccount = buildDeleteAccount({ dbFuncs });
const getAccount = buildGetAccount({ dbFuncs });
const {
    updateEmail,
    // updateUsername,
    updatePassword,
    updatePhoneNumber,
} = buildUpdateAccount({
    dbFuncs,
    hash,
    isValidPhoneNumber,
});
const verifyPassword = buildVerifyPassword({ dbFuncs, verify });

export {
    updateEmail,
    // updateUsername,
    updatePassword,
    createAccount,
    loginAccount,
    verifyPassword,
    updatePhoneNumber,
    getAccount,
    deleteAccount,
};