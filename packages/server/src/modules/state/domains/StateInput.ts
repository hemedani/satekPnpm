import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { State } from "../../../entity/State";

@InputType()
export class StateInput implements Partial<State> {
    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;
}
