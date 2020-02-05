import { Entity, Column, OneToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Thing } from "./Thing";
import { Unit } from "./Site";

@ObjectType()
@Entity()
export class Order_statistic extends Thing {
    @Field(() => Unit, { nullable: true })
    @OneToOne(
        () => Unit,
        unit => unit.orderStatistic
    )
    unit: Unit;
    /**
     * pending statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInUnitHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInOrgHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInStoreNumber?: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingForPayNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInAcountantNumber?: number;

    /**
     * rejected statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByUnitHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByOrgHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByStoreNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByEmployeeNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedForPayNumber: number;

    /**
     * misc statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    preparationByStoreNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    sentByStoreNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    partialDeliveryNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    paidNumber: number;
}
