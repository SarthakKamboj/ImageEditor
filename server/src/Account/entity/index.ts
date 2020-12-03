import { buildAccount } from './account';
import { isValidEmail, isValidPhoneNumber } from './validationFunctions';

const makeAccount = buildAccount({
    isValidEmail,
    isValidPhoneNumber,
});

export { makeAccount };
