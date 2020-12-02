import { AccountResType, AccountType, ErrorType } from '../entity/accountTypes';
import { dbFunctions } from './useCaseTypes';

type BuildUpdateTypes = {
    dbFuncs: dbFunctions;
    hash: (str: string) => Promise<string>;
    isValidPhoneNumber: (phoneNumber: number) => ErrorType | undefined;
};

export const buildUpdateAccount = (buildUpdateInputs: BuildUpdateTypes) => {
    const {
        dbFuncs: { update, findByEmail },
        hash,
        isValidPhoneNumber,
    } = buildUpdateInputs;
    return { updateEmail, updatePassword, updatePhoneNumber };

    async function updatePhoneNumber({
        id,
        phoneNumber,
    }: {
        id: number;
        phoneNumber: number;
    }): Promise<AccountResType> {
        const phoneNumberInValid = isValidPhoneNumber(phoneNumber);
        if (phoneNumberInValid) {
            return {
                errors: [phoneNumberInValid],
            };
        }
        const res = await update(id, 'phone_number', phoneNumber);
        const account = res.rows[0] as AccountType;

        return { account };
    }

    async function updateEmail({
        id,
        email,
    }: {
        id: number;
        email: string;
    }): Promise<AccountResType> {
        const curDbRes = await findByEmail(email);
        if (curDbRes) {
            return {
                errors: [
                    {
                        source: 'update email',
                        message: 'account with this email already exists',
                    },
                ],
            };
        }

        const res = await update(id, 'email', email);
        if (res.rows === []) {
            return {
                errors: [
                    {
                        source: 'email update',
                        message: 'account with this email does not exist',
                    },
                ],
            };
        }
        const account = res.rows[0] as AccountType;
        return { account };
    }

    async function updatePassword({
        id,
        newPassword,
    }: {
        id: number;
        newPassword: string;
    }): Promise<AccountResType> {
        const hashedPassword = await hash(newPassword);
        const res = await update(id, 'password', hashedPassword);
        const account = res.rows[0] as AccountType;
        return { account };
    }
};
