import { Field, InputType } from "type-graphql";
import { Order, ChosenPayment, OrderStatus } from "../../../entity/Order";
import { LongPayment } from "../../../entity/Stuff";

@InputType()
export class UpdateOrderInput implements Partial<Order> {
    @Field(() => OrderStatus, { nullable: true })
    status?: OrderStatus;

    @Field({ nullable: true })
    deliveryTime?: Date;

    @Field(() => ChosenPayment, { nullable: true })
    chosenPayment?: ChosenPayment;

    @Field(() => LongPayment, { nullable: true })
    longPayment?: LongPayment;
}
