import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WareGroup } from "../../../entity/WareGroup";

@InputType()
export class CreateWareGroupInput implements Partial<WareGroup> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field()
    @Length(2, 255)
    enName: string;

    @Field(() => String)
    wareTypeId: string;

    @Field(() => [String])
    wareClassIds: string[];
}
