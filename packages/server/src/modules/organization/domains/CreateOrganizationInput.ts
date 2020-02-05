import { Field, InputType } from "type-graphql";
import { Organization } from "../../../entity/Site";
import { CreateSiteInput } from "../../site/domains/CreateSiteInput";

@InputType()
export class CreateOrganizationInput extends CreateSiteInput
    implements Partial<Organization> {
    @Field()
    cityId: string;

    @Field()
    stateId: string;

    @Field()
    universityId?: string;
}
