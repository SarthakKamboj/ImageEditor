import { AccountResType, ErrorType } from '../entity/accountTypes';
import { isValidEmail } from '../entity/validationFunctions';
import { dbFunctions } from './useCaseTypes';

type BuildUpdateTypes = {
    dbFuncs: dbFunctions;
    hash: (str: string) => Promise<string>;
    isValidPhoneNumber: (phoneNumber: number) => ErrorType | undefined;
    isValidEmail: (email: string) => ErrorType | undefined;
};

type UpdateUserInputs = {
    id: number;
    newPhoneNumber: number;
};

type UpdateEmailInputs = {
    id: number;
    newEmail: string;
};

type UpdatePasswordInputs = {
    id: number;
    newPassword: string;
};

export const buildUpdateAccount = (buildUpdateInputs: BuildUpdateTypes) => {
    const {
        dbFuncs: { update },
        hash,
        isValidPhoneNumber,
    } = buildUpdateInputs;
    return { updateEmail, updatePassword, updatePhoneNumber };

    async function updatePhoneNumber(
        updateInputs: UpdateUserInputs
    ): Promise<AccountResType> {
        const { id, newPhoneNumber } = updateInputs;
        const phoneNumberInValid = isValidPhoneNumber(newPhoneNumber);
        if (phoneNumberInValid) {
            return {
                errors: [phoneNumberInValid],
            };
        }
        const { account, errors } = await update({
            id,
            phone_number: newPhoneNumber,
        });

        if (errors) {
            return {
                errors,
            };
        }

        return { account };
    }

    async function updateEmail(
        updateInputs: UpdateEmailInputs
    ): Promise<AccountResType> {
        const { id, newEmail: newEmail } = updateInputs;
        const notValidEmailError = isValidEmail(newEmail);

        if (notValidEmailError) {
            return {
                errors: [notValidEmailError],
            };
        }

        const { account, errors } = await update({ id, email: newEmail });
        if (errors) {
            return {
                errors,
            };
        }
        return { account };
    }

    async function updatePassword(
        updateInputs: UpdatePasswordInputs
    ): Promise<AccountResType> {
        const { id, newPassword } = updateInputs;
        const hashedPassword = await hash(newPassword);
        const { account, errors } = await update({
            id,
            password: hashedPassword,
        });

        if (errors) {
            return {
                errors,
            };
        }
        return { account };
    }
};
