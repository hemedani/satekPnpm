import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { State } from "../../../entity/State";

@InputType()
export class CreateStateInput implements Partial<State> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field()
    @Length(2, 255)
    enName: string;
}
