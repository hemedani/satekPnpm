import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WareGroup } from "../../../entity/WareGroup";

@InputType()
export class UpdateWareGroupInput implements Partial<WareGroup> {
    @Field({ nullable: true })
    @Length(2, 255)
    name?: string;

    @Field({ nullable: true })
    @Length(2, 255)
    enName?: string;

    @Field(() => String, { nullable: true })
    wareTypeId?: string;

    @Field(() => [String], { nullable: true })
    wareClassIds?: string[];
}
