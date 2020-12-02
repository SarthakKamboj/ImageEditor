import { AccountResType, AccountType, ErrorType } from './accountTypes';

type buildAccountType = {
    isValidEmail: (email: string) => ErrorType | undefined;
    isValidPhoneNumber: (phoneNumber: number) => ErrorType | undefined;
};

export const buildAccount = (buildAccountInputs: buildAccountType) => {
    const { isValidEmail, isValidPhoneNumber } = buildAccountInputs;
    return (accountInputs: AccountType): AccountResType => {
        const {
            email,
            password,
            phone_number,
            created_at = new Date(),
            updated_at = new Date(),
        } = accountInputs;

        const errors: ErrorType[] = [];

        const emailError = isValidEmail(email);
        if (emailError !== undefined) {
            errors.push(emailError);
        }

        const phoneNumberError = isValidPhoneNumber(phone_number);
        if (phoneNumberError !== undefined) {
            errors.push(phoneNumberError);
        }

        if (errors.length > 0) {
            return {
                errors,
            };
        }

        const account = {
            email,
            password,
            phone_number,
            created_at,
            updated_at,
        } as AccountType;

        return {
            account,
        };
    };
};
