import { Field, InputType } from "type-graphql";
import { ClassGroup } from "../../../entity/ClassGroup";
import { MaxLength } from "class-validator";
@InputType()
export class ClassGroupInput implements Partial<ClassGroup> {
    @Field({ nullable: true })
    @MaxLength(50)
    wareClassId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    wareGroupId?: string;
}
