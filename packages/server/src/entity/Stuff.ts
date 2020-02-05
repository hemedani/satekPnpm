import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./Order";
import { Store } from "./Site";
import { Thing } from "./Thing";
import { Ware } from "./Ware";
import { GraphQLFloat } from "graphql";
import { WareModel } from "./WareModel";
import { WareClass } from "./WareClass";
import { WareType } from "./WareType";
import { WareGroup } from "./WareGroup";

export enum LongPayment {
    twoMonth = 1,
    threeMonth,
    fourMonth,
    fiveMonth,
    sixMonth,
    sevenMonth,
    eightMonth,
    nineMonth,
    tenMonth,
    elevenMonth,
    twelveMonth,
    eighteenMonth,
    twentyFourMonth
}

registerEnumType(LongPayment, {
    name: "LongPayment",
    description: "An enum for Long Payment"
});

@ObjectType()
@Entity()
export class Stuff extends Thing {
    @Field(() => [LongPayment], { nullable: true })
    @Column({
        type: "enum",
        enum: LongPayment,
        array: true,
        nullable: true
    })
    availableLongPayment?: LongPayment[];

    @Field()
    @Column()
    expiration: Date;

    @Field(() => Int)
    @Column("bigint")
    inventoryNo: number;

    @Field(() => GraphQLFloat, { nullable: true })
    @Column("bigint", { nullable: true })
    barcode?: number;

    @Field(() => String, { nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    qrc?: string;

    @Field({ defaultValue: false })
    @Column({ default: false })
    isBarcodeSet: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isExpiring?: boolean;

    @Field()
    @Column()
    hasAbsolutePrice: boolean;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    pricePercentage?: number;

    @Field()
    @Column("bigint")
    price: number;

    @Column()
    wareId: string;

    @Field(() => Ware, { nullable: true })
    @ManyToOne(
        () => Ware,
        ware => ware.stuffs
    )
    @JoinColumn({ name: "wareId" })
    ware?: Ware;

    @Column()
    storeId: string;

    @Field(() => Store, { nullable: true })
    @ManyToOne(
        () => Store,
        store => store.stuffs
    )
    @JoinColumn({ name: "storeId" })
    store?: Store;

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.stuff
    )
    orders?: Order[];

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    twoMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    twoMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    threeMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    threeMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    fourMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    fourMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    fiveMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    fiveMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    sixMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    sixMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    sevenMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    sevenMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    eightMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    eightMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    nineMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    nineMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    tenMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    tenMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    elevenMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    elevenMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    twelveMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    twelveMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    eighteenMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    eighteenMonth?: number;

    @Field({ nullable: true })
    @Column("float", { nullable: true })
    twentyFourMonthPricePercent?: number;

    @Field({ nullable: true })
    @Column("bigint", { nullable: true })
    twentyFourMonth?: number;

    @Column()
    wareTypeId: string;

    @Field(() => WareType)
    @ManyToOne(
        () => WareType,
        wareType => wareType.stuffs
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @Column()
    wareClassId: string;

    @Field(() => WareClass)
    @ManyToOne(
        () => WareClass,
        wareClass => wareClass.stuffs
    )
    @JoinColumn({ name: "wareClassId" })
    wareClass: WareClass;

    @Column()
    wareGroupId: string;

    @Field(() => WareGroup, { nullable: true })
    @ManyToOne(
        () => WareGroup,
        wareGroup => wareGroup.stuffs
    )
    @JoinColumn({ name: "wareGroupId" })
    wareGroup?: WareGroup;

    @Column()
    wareModelId: string;

    @Field(() => WareModel)
    @ManyToOne(
        () => WareModel,
        wareModel => wareModel.stuffs
    )
    @JoinColumn({ name: "wareModelId" })
    wareModel: WareModel;
}
