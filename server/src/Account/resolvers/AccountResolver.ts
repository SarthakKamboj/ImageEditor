import { ContextType } from '../../ContextType';
import {
    Arg,
    Ctx,
    Field,
    Float,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { AccountResType, ErrorType } from '../entity/accountTypes';
import {
    createAccount,
    deleteAccount,
    getAccount,
    loginAccount,
    updateEmail,
    updatePassword,
    updatePhoneNumber,
    verifyPassword,
} from '../useCases';
import {
    CreateAccountType,
    DeleteAccountResType,
    LoginInput,
} from './AccountResolverInputs';

@ObjectType()
class LogoutResType {
    @Field(() => Boolean)
    loggedOut: boolean;

    @Field(() => [ErrorType], { nullable: true })
    errors?: ErrorType[];
}

@ObjectType()
class LoggedInType {
    @Field()
    loggedIn: boolean;
}

@Resolver()
export class AccountResolver {
    @Query(() => AccountResType)
    async me(@Ctx() { req }: ContextType): Promise<AccountResType> {
        const accountId = req.session.accountId;
        if (accountId === undefined) {
            return {
                errors: [
                    {
                        source: 'me',
                        message: 'account not logged in',
                    },
                ],
            };
        }
        return await getAccount(accountId);
    }

    @Query(() => LoggedInType)
    loggedIn(@Ctx() { req }: ContextType): LoggedInType {
        const accountId = req.session.accountId;
        if (!accountId) {
            return {
                loggedIn: false,
            };
        }

        return {
            loggedIn: true,
        };
    }

    @Mutation(() => AccountResType)
    async login(
        @Arg('input', () => LoginInput)
        { email, password }: LoginInput,
        @Arg('keepLoggedIn', () => Boolean) keepLoggedIn: boolean,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const { account, errors } = await loginAccount({
            email,
            password,
        });

        if (account === undefined) {
            return {
                errors,
            };
        }

        if (keepLoggedIn) {
            req.session.accountId = account.id!;
        }

        return { account };
    }

    @Mutation(() => AccountResType)
    async verifyPassword(
        @Arg('password', () => String) password: string,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const accountId = req.session.accountId;
        const source = 'verify password';

        if (!accountId) {
            return {
                errors: [
                    {
                        source,
                        message: 'account not logged in',
                    },
                ],
            };
        }

        const { account, errors } = await verifyPassword({
            id: accountId,
            password,
        });
        if (account === undefined) {
            return {
                errors,
            };
        }
        return { account };
    }

    @Mutation(() => LogoutResType)
    logout(@Ctx() { req }: ContextType): LogoutResType {
        const accountId = req.session.accountId;
        if (!accountId) {
            return {
                loggedOut: false,
                errors: [
                    {
                        source: 'logout',
                        message: 'account not logged in',
                    },
                ],
            };
        }
        req.session.destroy(() => {});
        return {
            loggedOut: true,
        };
    }

    @Mutation(() => DeleteAccountResType)
    async deleteAccount(
        @Ctx() { req }: ContextType
    ): Promise<DeleteAccountResType> {
        const source = 'account deletion';
        const accountId = req.session.accountId;

        if (!accountId) {
            return {
                deleted: false,
                errors: [
                    {
                        source,
                        message: 'account not logged in',
                    },
                ],
            };
        }

        req.session.destroy(() => {
            console.log('cookie destroyed');
        });
        return await deleteAccount(accountId);
    }

    @Mutation(() => AccountResType)
    async createAccount(
        @Arg('input', () => CreateAccountType)
        { email, password, phone_number }: CreateAccountType,
        @Arg('keepLoggedIn', () => Boolean) keepLoggedIn: boolean,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const { account, errors } = await createAccount({
            email,
            password,
            phone_number,
        });
        if (account === undefined) {
            return {
                errors,
            };
        }

        if (keepLoggedIn) {
            req.session.accountId = account.id!;
        }

        return {
            account,
        };
    }

    @Mutation(() => AccountResType)
    async updatePassword(
        @Arg('newPassword', () => String) newPassword: string,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const accountId = req.session.accountId;
        if (!accountId) {
            return {
                errors: [
                    {
                        source: 'update password',
                        message: 'account not logged in',
                    },
                ],
            };
        }

        const { account, errors } = await updatePassword({
            id: accountId,
            newPassword,
        });
        if (account === undefined) {
            return { errors };
        }
        return { account };
    }

    @Mutation(() => AccountResType) async updateEmail(
        @Arg('newEmail', () => String) newEmail: string,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const accountId = req.session.accountId;
        if (!accountId) {
            return {
                errors: [
                    {
                        source: 'email update',
                        message: 'account not logged in',
                    },
                ],
            };
        }
        const { account, errors } = await updateEmail({
            id: accountId,
            newEmail,
        });
        if (account === undefined) {
            return { errors };
        }
        return { account };
    }

    @Mutation(() => AccountResType)
    async updatePhoneNumber(
        @Arg('newPhoneNumber', () => Float) newPhoneNumber: number,
        @Ctx() { req }: ContextType
    ): Promise<AccountResType> {
        const accountId = req.session.accountId;
        if (!accountId) {
            return {
                errors: [
                    {
                        source: 'phone number update',
                        message: 'account not logged in',
                    },
                ],
            };
        }
        const { account, errors } = await updatePhoneNumber({
            id: accountId,
            newPhoneNumber,
        });
        if (account === undefined) {
            return { errors };
        }
        return { account };
    }
}
