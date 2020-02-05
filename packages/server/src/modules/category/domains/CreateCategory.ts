import { Field, InputType } from "type-graphql";
import { Category } from "../../../entity/Category";

@InputType()
export class CreateCategoryInput implements Partial<Category> {
    @Field()
    name: string;

    @Field({ nullable: true })
    enName?: string;

    @Field()
    cityId: string;

    @Field()
    stateId: string;

    @Field()
    universityId: string;

    @Field()
    organizationId: string;
}
