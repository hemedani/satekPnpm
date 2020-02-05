import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { WareModel } from "../../../entity/WareModel";

@InputType()
export class CreateWareModelInput implements Partial<WareModel> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field()
    @Length(2, 255)
    enName: string;

    @Field()
    wareTypeId: string;

    @Field()
    wareClassId: string;

    @Field()
    wareGroupId: string;
}
