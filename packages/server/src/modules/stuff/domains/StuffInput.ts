import { MaxLength } from "class-validator";
import { Field, InputType, Int, registerEnumType } from "type-graphql";
import { LongPayment, Stuff } from "../../../entity/Stuff";

export enum StuffSort {
    Price = 1,
    inventoryNo,
    createdAt
}

registerEnumType(StuffSort, {
    name: "StuffSort",
    description: "An enum for select sort base for Stuff"
});

@InputType()
export class StuffInput implements Partial<Stuff> {
    @Field({ nullable: true })
    @MaxLength(255)
    wareDocument?: string;

    @Field({ nullable: true })
    wareTypeId?: string;

    @Field(() => [String], { nullable: true })
    wareClassIds?: string[];

    @Field(() => [String], { nullable: true })
    wareGroupIds?: string[];

    @Field({ nullable: true })
    wareModelId?: string;

    @Field({ nullable: true })
    manufacturerId?: string;

    @Field({ nullable: true })
    storeId?: string;

    @Field({ nullable: true })
    wareId?: string;

    @Field({ nullable: true })
    storeHeadId?: string;

    @Field(() => Int, { nullable: true })
    inventoryNo?: number;

    @Field({ nullable: true })
    expiration?: Date;

    @Field(() => LongPayment, { nullable: true })
    longPayment?: LongPayment;

    @Field(() => Boolean, { nullable: true })
    getTotal?: boolean;

    @Field(() => Boolean, { nullable: true })
    getNotExpired?: boolean;
}
