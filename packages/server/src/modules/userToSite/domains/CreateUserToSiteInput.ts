import { Field, InputType } from "type-graphql";
import { UserRole, UserToSite } from "../../../entity/UserToSite";

@InputType()
export class CreateUserToSiteInput implements Partial<UserToSite> {
    @Field(() => UserRole)
    role: UserRole;

    @Field()
    userId: string;

    @Field({ nullable: true })
    siteId?: string;
}
