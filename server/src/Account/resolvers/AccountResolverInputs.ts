import { Field, Float, InputType, ObjectType } from 'type-graphql';
import { ErrorType } from '../entity/accountTypes';

@InputType()
export class LoginInput {
    @Field({ nullable: true })
    email: string;

    @Field()
    password: string;
}

@InputType()
export class EmailPasswordInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class CreateAccountType {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    phone_number: number;
}

@InputType()
export class UpdateEmailType {
    @Field()
    oldEmail: string;

    @Field()
    newEmail: string;
}

@InputType()
export class UpdateUsernameType {
    @Field()
    oldUsername: string;

    @Field()
    newUsername: string;
}

@InputType()
export class UpdatePhoneNumberType {
    @Field()
    email: string;

    @Field(() => Float)
    phoneNumber: number;
}

@ObjectType()
export class DeleteAccountResType {
    @Field(() => [ErrorType], { nullable: true })
    errors?: ErrorType[];

    @Field(() => Boolean, { nullable: true })
    deleted?: boolean;
}
