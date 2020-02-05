import { Length } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { Ware } from "../../../entity/Ware";
import { GraphQLFloat } from "graphql";

@InputType()
export class CreateWareInput implements Partial<Ware> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field({ nullable: true })
    @Length(2, 255)
    enName?: string;

    @Field()
    @Length(2, 255)
    brand: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int, { nullable: true })
    umdns?: number;

    @Field(() => GraphQLFloat, { nullable: true })
    gtin?: number;

    @Field({ nullable: true })
    @Length(4, 30)
    irc?: string;

    @Field()
    manufacturerId: string;

    @Field()
    wareTypeId: string;

    @Field()
    wareClassId: string;

    @Field()
    wareGroupId: string;

    @Field()
    wareModelId: string;
}
