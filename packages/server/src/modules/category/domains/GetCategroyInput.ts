import { Field, InputType } from "type-graphql";
import { Category } from "../../../entity/Category";

@InputType()
export class GetCategoryInput implements Partial<Category> {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    enName?: string;

    @Field({ nullable: true })
    cityId: string;

    @Field({ nullable: true })
    stateId?: string;

    @Field({ nullable: true })
    unitId?: string;

    @Field({ nullable: true })
    universityId?: string;

    @Field({ nullable: true })
    organizationId?: string;
}
