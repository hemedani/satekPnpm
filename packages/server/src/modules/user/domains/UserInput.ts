import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";
import { UserRole } from "../../../entity/UserToSite";

@InputType()
export class UserInput implements Partial<User> {
    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    organizationId?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    unitId?: string;

    @Field(() => UserRole, { nullable: true })
    role?: UserRole;

    @Field({ nullable: true })
    @MaxLength(255)
    wareName?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    wareDocument?: string;

    @Field({ nullable: true })
    wareGroupId?: string;

    @Field({ nullable: true })
    wareClassId?: string;
}
