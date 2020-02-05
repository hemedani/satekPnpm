import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Ware } from "../../../entity/Ware";

@InputType()
export class WareInput implements Partial<Ware> {
    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;

    @Field({ nullable: true })
    wareModelId?: string;

    @Field({ nullable: true })
    wareGroupId?: string;

    @Field({ nullable: true })
    wareClassId?: string;

    @Field({ nullable: true })
    wareTypeId?: string;

    @Field({ nullable: true })
    userId?: string;
}
