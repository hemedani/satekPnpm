import { Field, InputType } from "type-graphql";
import { WareType } from "../../../entity/WareType";
import { Length } from "class-validator";

@InputType()
export class CreateWareTypeInput implements Partial<WareType> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field({ nullable: true })
    @Length(2, 255)
    enName?: string;
}
