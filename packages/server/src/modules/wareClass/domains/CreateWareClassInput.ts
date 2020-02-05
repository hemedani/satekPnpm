import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { WareClass } from "../../../entity/WareClass";

@InputType()
export class CreateWareClassInput implements Partial<WareClass> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field()
    @Length(2, 255)
    enName: string;

    @Field()
    wareTypeId: string;
}
