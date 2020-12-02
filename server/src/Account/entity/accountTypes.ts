import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AccountType {
    @Field({ nullable: true })
    id?: number;

    @Field()
    email: string;

    password: string;

    @Field()
    phone_number: number;

    @Field(() => Date)
    created_at?: Date;

    @Field(() => Date)
    updated_at?: Date;
}

@ObjectType()
export class ErrorType {
    @Field()
    source: string;

    @Field()
    message: string;
}

@ObjectType()
export class AccountResType {
    @Field(() => AccountType, { nullable: true })
    account?: AccountType;

    @Field(() => [ErrorType], { nullable: true })
    errors?: ErrorType[];
}
