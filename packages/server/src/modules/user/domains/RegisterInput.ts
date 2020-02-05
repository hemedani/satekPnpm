import { Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";
import { IsPhoneExist } from "../guards/IsPhoneAlreadyExist";
// import { IsPhone } from "../guards/IsPhone";

@InputType()
export class RegisterInput implements Partial<User> {
    @Field({ nullable: true })
    photoUrl: string;

    @Field()
    @Length(2, 255)
    firstName: string;

    @Field()
    @Length(2, 255)
    lastName: string;

    @Field()
    @Length(2, 255)
    ssn: string;

    @Field()
    // @IsPhone()
    @IsPhoneExist()
    phoneNumber: string;

    @Field({ nullable: true })
    @MaxLength(255)
    password?: string;

    @Field({ nullable: true })
    @Length(6, 255)
    organizationId?: string;
}
