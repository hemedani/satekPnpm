import { Field, InputType, Int } from "type-graphql";
import { Order, OrderStatus, ChosenPayment } from "../../../entity/Order";
import { LongPayment } from "../../../entity/Stuff";

@InputType()
export class UpdateOrderStuffInput implements Partial<Order> {
    @Field()
    stuffId: string;

    @Field(() => OrderStatus, { nullable: true })
    status?: OrderStatus;

    @Field(() => Int, { nullable: true })
    num?: number;

    @Field(() => ChosenPayment, { nullable: true })
    chosenPayment?: ChosenPayment;

    @Field(() => LongPayment, { nullable: true })
    longPayment?: LongPayment;
}
