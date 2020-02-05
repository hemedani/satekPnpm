import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
// import { IsPhone } from "../guards/IsPhone";

@InputType()
export class LoginRequestInput {
    @Field()
    // @IsPhone()
    phone: string;

    @Field()
    @Length(2, 255)
    device: string;
}

@InputType()
export class LoginInput {
    @Field()
    // @IsPhone()
    phone: string;

    @Field()
    @Length(2, 255)
    device: string;

    @Field()
    code: string;
}
