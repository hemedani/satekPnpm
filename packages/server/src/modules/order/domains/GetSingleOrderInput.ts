import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Order } from "../../../entity/Order";
@InputType()
export class GetSingleOrderInput implements Partial<Order> {
    @Field()
    @MaxLength(50)
    storeId: string;

    @Field()
    @MaxLength(50)
    orderId: string;
}
