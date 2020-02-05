import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Unit } from "../../../entity/Site";

@InputType()
export class UnitInput implements Partial<Unit> {
    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;

    @Field({ nullable: true })
    organizationId?: string;

    @Field({ nullable: true })
    categoryId?: string;
}
