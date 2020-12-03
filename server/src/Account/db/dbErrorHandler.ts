import { ErrorType } from '../entity/accountTypes';

export const handleDbError = (
    source: string,
    e: any
): ErrorType[] | undefined => {
    const errorCode = parseInt(e.code);
    let errorMsg = '';

    switch (errorCode) {
        case 23505:
            errorMsg = 'value is not unique';
            break;
        default:
            break;
    }

    return [
        {
            source,
            message: errorMsg,
        },
    ];
};
