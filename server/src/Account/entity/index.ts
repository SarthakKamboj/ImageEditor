import { buildAccount } from './account';
import { ErrorType } from './accountTypes';
import validator from 'validator';

import Filter from 'bad-words';
const filter = new Filter();

const maxEmailLength = 255;
const phoneNumLength = 10;

const makeAccount = buildAccount({
    isValidEmail,
    isValidPhoneNumber,
});

export { makeAccount };

export function isValidPhoneNumber(phoneNumber: number): ErrorType | undefined {
    if (phoneNumber.toString().length !== phoneNumLength) {
        return {
            source: 'phone number',
            message: 'phone number is wrong length',
        };
    }

    return;
}

function isValidEmail(email: string): ErrorType | undefined {
    if (email.length > maxEmailLength) {
        return {
            source: 'email',
            message: 'email is too long',
        };
    }

    if (!validator.isEmail(email)) {
        return {
            source: 'email',
            message: 'email is invalid',
        };
    } else if (filter.isProfane(email)) {
        return {
            source: 'email',
            message: 'email contains profanity',
        };
    }

    return;
}
