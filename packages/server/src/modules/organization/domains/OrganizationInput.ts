import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Organization } from "../../../entity/Site";

@InputType()
export class OrganizationInput implements Partial<Organization> {
    @Field({ nullable: true })
    @MaxLength(255)
    document: string;

    @Field({ nullable: true })
    universityId: string;
}
