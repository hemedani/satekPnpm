import { Field, InputType, Int } from "type-graphql";
import { FastDeliveryTime, Order, ChosenPayment } from "../../../entity/Order";
import { LongPayment } from "../../../entity/Stuff";

@InputType()
export class CreateOrderInput implements Partial<Order> {
    @Field(() => Int)
    num: number;

    @Field(() => Int, { nullable: true })
    remaining?: number;

    @Field()
    wareId: string;

    @Field()
    requestorUserId: string;

    @Field()
    organizationId: string;

    @Field()
    unitId: string;

    @Field({ nullable: true })
    stuffId?: string;

    @Field({ nullable: true })
    deliveryTime?: Date;

    @Field()
    fastDelivery: boolean;

    @Field(() => FastDeliveryTime, { nullable: true })
    fastDeliveryTime?: FastDeliveryTime;

    @Field(() => ChosenPayment, { nullable: true })
    chosenPayment?: ChosenPayment;

    @Field(() => LongPayment, { nullable: true })
    longPayment?: LongPayment;
}
