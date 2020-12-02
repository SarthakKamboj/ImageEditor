import { buildSchema } from 'type-graphql';
import { AccountResolver } from './Account/resolvers/AccountResolver';
import { UserResolver } from './User/resolvers/UserResolver';

export const getSchema = () => {
    return buildSchema({
        resolvers: [AccountResolver, UserResolver],
        validate: false,
    });
};
