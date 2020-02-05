import { MaxLength } from "class-validator";
import { Field, InputType, registerEnumType } from "type-graphql";
import { Order, OrderStatus, CheckBySupplier, CheckByStockclerk } from "../../../entity/Order";

export enum OrderSort {
    Price_Asd = 1,
    Price_Desc,
    CreatedAt_Asd,
    CreatedAt_Desc,
    Delivery_Asd,
    Delivery_Desc
}

registerEnumType(OrderSort, {
    name: "OrderSort",
    description: "order sort input"
});

export enum CommentByExpertStatusInput {
    bothSentAndResponded = 1,
    sentNoResponse,
    responded
}

registerEnumType(CommentByExpertStatusInput, {
    name: "ExpertCommentStatusInput",
    description: "Expert response status for get order input"
});

export enum CommentByFinanceStatusInput {
    bothSentAndResponded = 1,
    sentNoResponse,
    responded
}

registerEnumType(CommentByFinanceStatusInput, {
    name: "CommentByFinanceStatusInput",
    description: "Finance response status for get order input"
});

export enum CheckBySupplierStatusInput {
    bothRespondedAndNoResponse = 1,
    NoResponse,
    responded
}

registerEnumType(CheckBySupplierStatusInput, {
    name: "CheckBySupplierStatusInput",
    description: "supplier response status for get order input"
});

export enum CheckByStockclerkStatusInput {
    bothRespondedAndNoResponse = 1,
    NoResponse,
    responded
}

registerEnumType(CheckByStockclerkStatusInput, {
    name: "CheckByStockclerkStatusInput",
    description: "Stockclerk response status for get order input"
});

@InputType()
export class OrderInput implements Partial<Order> {
    @Field({ nullable: true })
    @MaxLength(255)
    wareDocument?: string;

    @Field({ nullable: true })
    fastDelivery?: boolean;

    @Field({ nullable: true })
    @MaxLength(50)
    trackingcode?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    organizationId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    unitId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    storeId?: string;

    @Field(() => [OrderStatus], { nullable: true })
    statuses?: OrderStatus[];

    @Field({ nullable: true })
    @MaxLength(50)
    irc?: string;

    @Field(() => CommentByExpertStatusInput, { nullable: true })
    commentByExpertStatusInput?: CommentByExpertStatusInput;

    @Field(() => CommentByFinanceStatusInput, { nullable: true })
    commentByFinanceStatusInput?: CommentByFinanceStatusInput;

    @Field(() => CheckBySupplierStatusInput, { nullable: true })
    checkBySupplierStatusInput?: CheckBySupplierStatusInput;

    @Field(() => CheckByStockclerkStatusInput, { nullable: true })
    checkByStockclerkStatusInput?: CheckByStockclerkStatusInput;

    @Field(() => CheckBySupplier, { nullable: true })
    checkBySupplier?: CheckBySupplier;

    @Field(() => CheckByStockclerk, { nullable: true })
    checkByStockclerk?: CheckByStockclerk;

    @Field(() => Date, { nullable: true })
    startDate?: Date;

    @Field(() => Date, { nullable: true })
    endDate?: Date;

    @Field({ nullable: true })
    wareTypeId?: string;

    @Field({ nullable: true })
    wareClassId?: string;

    @Field({ nullable: true })
    wareGroupId?: string;

    @Field({ nullable: true })
    wareModelId?: string;

    @Field({ nullable: true })
    storeHeadId?: string;

    @Field(() => Boolean, { nullable: true })
    getTotal?: boolean;
}
