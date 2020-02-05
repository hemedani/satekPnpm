import { Field, InputType } from "type-graphql";
import { University } from "../../../entity/Site";
import { CreateSiteInput } from "../../site/domains/CreateSiteInput";

@InputType()
export class CreateUniversityInput extends CreateSiteInput
    implements Partial<University> {
    @Field()
    cityId: string;

    @Field()
    stateId: string;
}
