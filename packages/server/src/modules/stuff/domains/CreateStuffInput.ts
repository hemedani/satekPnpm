import { ArrayUnique, Length } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { LongPayment, Stuff } from "../../../entity/Stuff";
import { GraphQLFloat } from "graphql";

@InputType()
export class CreateStuffInput implements Partial<Stuff> {
    @Field(() => [LongPayment], { nullable: true })
    @ArrayUnique({ message: "عناصر لیست پرداخت های مدت دار باید یکتا باشند." })
    availableLongPayment?: LongPayment[];

    @Field()
    expiration: Date;

    @Field(() => Int)
    inventoryNo: number;

    @Field()
    hasAbsolutePrice: boolean;

    @Field({ nullable: true })
    pricePercentage?: number;

    @Field(() => Int, { nullable: true })
    price?: number;

    @Field()
    wareId: string;

    @Field()
    storeId: string;

    @Field({ nullable: true })
    twoMonthPricePercent?: number;

    @Field({ nullable: true })
    threeMonthPricePercent?: number;

    @Field({ nullable: true })
    fourMonthPricePercent?: number;

    @Field({ nullable: true })
    fiveMonthPricePercent?: number;

    @Field({ nullable: true })
    sixMonthPricePercent?: number;

    @Field({ nullable: true })
    sevenMonthPricePercent?: number;

    @Field({ nullable: true })
    eightMonthPricePercent?: number;

    @Field({ nullable: true })
    nineMonthPricePercent?: number;

    @Field({ nullable: true })
    tenMonthPricePercent?: number;

    @Field({ nullable: true })
    elevenMonthPricePercent?: number;

    @Field({ nullable: true })
    twelveMonthPricePercent?: number;

    @Field({ nullable: true })
    eighteenMonthPricePercent?: number;

    @Field({ nullable: true })
    twentyFourMonthPricePercent?: number;

    @Field(() => GraphQLFloat, { nullable: true })
    barcode?: number;

    @Field({ nullable: true })
    @Length(5, 255)
    qrc?: string;

    @Field({ defaultValue: false })
    isBarcodeSet: boolean;

    @Field({ nullable: true })
    isExpiring?: boolean;
}
