import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import {
    OrderStatus,
    CommentByExpertStatus,
    CommentByFinanceStatus,
    CheckByExpert,
    CheckByFinance,
    CheckBySupplier,
    CheckByStockclerk
} from "../../../entity/Order";

@InputType()
export class UpdateStatusOrderInput {
    @Field(() => OrderStatus)
    orderStatus: OrderStatus;

    @Field(() => CheckBySupplier, { nullable: true })
    checkBySupplier?: CheckBySupplier;

    @Field(() => CheckByStockclerk, { nullable: true })
    checkByStockclerk?: CheckByStockclerk;

    @Field(() => CommentByExpertStatus, { nullable: true })
    commentByExpertStatus?: CommentByExpertStatus;

    @Field(() => CommentByFinanceStatus, { nullable: true })
    commentByFinanceStatus?: CommentByFinanceStatus;

    @Field(() => CheckByExpert, { nullable: true })
    checkByExpert?: CheckByExpert;

    @Field(() => CheckByFinance, { nullable: true })
    checkByFinance?: CheckByFinance;

    @Field({ nullable: true })
    @Length(5, 1000)
    comment?: string;

    @Field({ nullable: true })
    stockRemaining?: number;
}
