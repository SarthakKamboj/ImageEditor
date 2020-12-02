import { buildSchema } from 'type-graphql';
import { AccountResolver } from './Account/resolvers/AccountResolver';

export const getSchema = () => {
    return buildSchema({
        resolvers: [AccountResolver],
        validate: false,
    });
};
