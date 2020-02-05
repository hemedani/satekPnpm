import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class GetWareTypeInput {
    @Field({ nullable: true, description: "name Or enName" })
    @MaxLength(255)
    document?: string;
}
