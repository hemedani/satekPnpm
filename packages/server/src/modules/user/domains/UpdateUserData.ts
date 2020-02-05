import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";
import { IsPhoneExist } from "../guards/IsPhoneAlreadyExist";
import { IsPhone } from "../guards/IsPhone";

@InputType()
export class UpdateUserData implements Partial<User> {
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
    @IsPhone()
    @IsPhoneExist()
    phoneNumber: string;

    @Field({ nullable: true })
    photoUrl?: string;

    @Field({ nullable: true })
    @Length(6, 255)
    password?: string;

    @Field(() => [String])
    allowedWaresIds: string[];
}
