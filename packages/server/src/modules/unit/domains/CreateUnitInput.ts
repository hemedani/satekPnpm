import { Field, InputType } from "type-graphql";
import { Unit } from "../../../entity/Site";
import { CreateSiteInput } from "../../site/domains/CreateSiteInput";

@InputType()
export class CreateUnitInput extends CreateSiteInput implements Partial<Unit> {
    @Field()
    cityId: string;

    @Field()
    stateId: string;

    @Field()
    universityId: string;

    @Field()
    organizationId: string;

    @Field()
    categoryId: string;
}
