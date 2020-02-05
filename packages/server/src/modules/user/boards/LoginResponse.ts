import { Field, ObjectType } from "type-graphql";

import { User } from "../../../entity/User";

@ObjectType()
export class LoginRequestResponse {
    @Field()
    ok: Boolean;

    @Field()
    phone: string;

    @Field({ nullable: true })
    code?: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    token: string;

    @Field()
    user: User;
}
