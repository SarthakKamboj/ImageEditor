import { AccountResType, AccountType, ErrorType } from './accountTypes';

type buildAccountType = {
    // isValidUsername: (username: string) => ErrorType | undefined;
    isValidEmail: (email: string) => ErrorType | undefined;
    isValidPhoneNumber: (phoneNumber: number) => ErrorType | undefined;
};

export const buildAccount = ({
    isValidEmail,
    isValidPhoneNumber,
}: // isValidUsername,
buildAccountType) => {
    return ({
        email,
        // username,
        password,
        phone_number,
        created_at = new Date(),
        updated_at = new Date(),
    }: AccountType): AccountResType => {
        const errors: ErrorType[] = [];

        const emailError = isValidEmail(email);
        if (emailError !== undefined) {
            errors.push(emailError);
        }

        // const usernameError = isValidUsername(username);
        // if (usernameError !== undefined) {
        //     errors.push(usernameError);
        // }

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
            // username,
            created_at,
            updated_at,
        } as AccountType;

        return {
            account,
        };
    };
};
