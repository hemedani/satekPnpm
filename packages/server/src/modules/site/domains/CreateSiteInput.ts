import { Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Site } from "../../../entity/Site";

@InputType({ isAbstract: true })
export class CreateSiteInput implements Partial<Site> {
    @Field({ nullable: true })
    logoUrl: string;

    @Field()
    @Length(4, 255)
    name: string;

    @Field()
    @Length(5, 255)
    address: string;

    @Field({ nullable: true })
    @MaxLength(255)
    location?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    contact?: string;
}
