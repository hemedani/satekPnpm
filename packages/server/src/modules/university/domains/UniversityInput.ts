import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { University } from "../../../entity/Site";

@InputType()
export class UniversityInput implements Partial<University> {
    @Field({ nullable: true })
    stateId?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;
}
