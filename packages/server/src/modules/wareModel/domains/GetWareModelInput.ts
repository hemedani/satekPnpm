import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class GetWareModelInput {
    @Field({ nullable: true })
    @MaxLength(50)
    wareGroupId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    wareClassId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    wareTypeId?: string;

    @Field({ nullable: true, description: "name Or enName" })
    @MaxLength(255)
    document?: string;
}
