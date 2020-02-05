import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { Organization, Store, Unit, University } from "./Site";
import { LongPayment, Stuff } from "./Stuff";
import { Thing } from "./Thing";
import { User } from "./User";
import { Ware } from "./Ware";
import { WareType } from "./WareType";
import { WareClass } from "./WareClass";
import { WareGroup } from "./WareGroup";
import { WareModel } from "./WareModel";
import { Category } from "./Category";

export enum CommentByExpertStatus {
    notSendFor = 1,
    sentNoResponse,
    responded
}

registerEnumType(CommentByExpertStatus, {
    name: "ExpertCommentStatus",
    description: "Expert response status for order"
});

export enum ChosenPayment {
    LongPayment = 1,
    Incash
}

registerEnumType(ChosenPayment, {
    name: "ChosenPayment",
    description: "The chosen methods from availble methods."
});

export enum CommentByFinanceStatus {
    notSendFor = 1,
    sentNoResponse,
    responded
}

registerEnumType(CommentByFinanceStatus, {
    name: "FinanceCommentStatus",
    description: "Finance response status for order"
});

export enum CheckByStockclerkStatus {
    NoResponse = 1,
    responded
}

registerEnumType(CheckByStockclerkStatus, {
    name: "CheckByStockclerkStatus",
    description: "Stockclerk response status for order"
});

export enum CheckBySupplierStatus {
    NoResponse = 1,
    responded
}

registerEnumType(CheckBySupplierStatus, {
    name: "CheckBySupplierStatus",
    description: "CheckBySupplier response status for order"
});

export enum CheckByStockclerk {
    Valid = 1,
    Invalid
}

registerEnumType(CheckByStockclerk, {
    name: "CheckByStockclerk",
    description: "Stockclerk validation checks if the order is valid or not"
});

export enum CheckBySupplier {
    Valid = 1,
    Invalid
}

registerEnumType(CheckBySupplier, {
    name: "CheckBySupplier",
    description: "Supplier validation checks if the order is valid or not"
});

export enum CheckByExpert {
    Valid = 1,
    Invalid
}

registerEnumType(CheckByExpert, {
    name: "CheckByExpert",
    description: "Expert validation checks if the order is valid or not"
});

export enum CheckByFinance {
    Valid = 1,
    Invalid
}

// export enum OrgHeadRejectionChoice{
//     NoMoney =
// }
registerEnumType(CheckByFinance, {
    name: "CheckByFinance",
    description: "Finance validation checks if the order is valid or not"
});

export enum OrderStatus {
    pendingInUnitHead = 1,
    rejectedByUnitHead,
    pendingInOrganizationHead,
    rejectedByOrganizationHead,
    pendingInStore,
    PreparationByStore,
    rejectedByStore,
    sentByStore,
    rejectedByEmployee,
    pendingForPay,
    rejectedForPay,
    pendingInAcountant,
    partialDelivery,
    Paid
}

export const storeHeadStatuses = [
    OrderStatus.Paid,
    OrderStatus.PreparationByStore,
    OrderStatus.pendingForPay,
    OrderStatus.pendingInStore,
    OrderStatus.sentByStore,
    OrderStatus.rejectedByStore
];

registerEnumType(OrderStatus, {
    name: "OrderStatus",
    description: "Current status for order"
});

export enum FastDeliveryTime {
    OneHour = 1,
    TwoHour,
    ThreeHour,
    FourHour,
    FiveHour
}

registerEnumType(FastDeliveryTime, {
    name: "FastDeliveryTime",
    description: "An enum for fast delivery time"
});

@ObjectType()
@Entity()
export class Order extends Thing {
    @Field(() => OrderStatus)
    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.pendingInUnitHead
    })
    status: OrderStatus;

    @Field(() => CommentByExpertStatus)
    @Column({
        type: "enum",
        enum: CommentByExpertStatus,
        default: CommentByExpertStatus.notSendFor
    })
    commentByExpertStatus: CommentByExpertStatus;

    @Field(() => CommentByFinanceStatus)
    @Column({
        type: "enum",
        enum: CommentByFinanceStatus,
        default: CommentByFinanceStatus.notSendFor
    })
    commentByFinanceStatus: CommentByFinanceStatus;

    @Field(() => CheckByExpert, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckByExpert,
        nullable: true
    })
    checkByExpert?: CheckByExpert;

    @Field(() => CheckByFinance, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckByFinance,
        nullable: true
    })
    checkByFinance?: CheckByFinance;

    @Field(() => CheckBySupplier, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckBySupplier,
        nullable: true
    })
    checkBySupplier?: CheckBySupplier;

    @Field(() => CheckByStockclerk, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckByStockclerk,
        nullable: true
    })
    checkByStockclerk?: CheckByStockclerk;

    @Field(() => CheckByStockclerkStatus, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckByStockclerkStatus,
        default: CheckByStockclerkStatus.NoResponse
    })
    checkByStockclerkStatus?: CheckByStockclerkStatus;

    @Field(() => CheckBySupplierStatus, { nullable: true })
    @Column({
        type: "enum",
        enum: CheckBySupplierStatus,
        default: CheckBySupplierStatus.NoResponse
    })
    checkBySupplierStatus?: CheckBySupplierStatus;

    @Field({ nullable: true })
    @Column("varchar", { length: 1000, nullable: true })
    commentForRejection?: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 1000, nullable: true })
    commentByExpert?: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 1000, nullable: true })
    commentByFinance?: string;

    @Column({ nullable: true })
    rejectedByUserId?: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "rejectedByUserId" })
    rejectedByUser?: User;

    @Field(() => Int)
    @Column("int")
    num: number;

    @Field(() => Int, { nullable: true })
    @Column("int", { nullable: true })
    remaining?: number;

    @Field(() => Int, { nullable: true })
    @Column("bigint", { nullable: true })
    stockRemaining?: number; //in stock

    @Column("bigint", { nullable: true })
    totalPrice?: number;

    @Field()
    @Column()
    deliveryTime: Date;

    @Field(() => FastDeliveryTime, { nullable: true })
    @Column({
        type: "enum",
        enum: FastDeliveryTime,
        nullable: true
    })
    fastDeliveryTime?: FastDeliveryTime;

    @Field()
    @Column({ default: false })
    fastDelivery: boolean;

    @Field()
    @Column({
        update: false
    })
    @Generated("uuid")
    trackingcode: string;

    @Column()
    wareId: string;

    @Field(() => Ware, { nullable: true })
    @ManyToOne(
        () => Ware,
        ware => ware.orders
    )
    @JoinColumn({ name: "wareId" })
    ware?: Ware;

    @Column()
    requestorUserId: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User)
    @JoinColumn({ name: "requestorUserId" })
    requestorUser?: User;

    @Column({ nullable: true })
    recipientUserId?: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "recipientUserId" })
    recipientUser?: User;

    @Column({ nullable: true })
    stuffId?: string;

    @Field(() => Stuff, { nullable: true })
    @ManyToOne(
        () => Stuff,
        stuff => stuff.orders
    )
    @JoinColumn({ name: "stuffId" })
    stuff?: Stuff;

    @Column()
    organizationId: string;

    @Field(() => Organization, { nullable: true })
    @ManyToOne(
        () => Organization,
        organization => organization.orders
    )
    @JoinColumn({ name: "organizationId" })
    organization?: Organization;

    @Column({ nullable: true })
    universityId?: string;

    @Field(() => University, { nullable: true })
    @ManyToOne(
        () => University,
        university => university.orders
    )
    @JoinColumn({ name: "universityId" })
    university?: University;

    @Column({ nullable: true })
    categoryId?: string;

    @Field(() => Category, { nullable: true })
    @ManyToOne(
        () => Category,
        category => category.orders
    )
    @JoinColumn({ name: "categoryId" })
    category?: Category;

    @Column()
    unitId: string;

    @Field(() => Unit, { nullable: true })
    @ManyToOne(
        () => Unit,
        unit => unit.orders
    )
    @JoinColumn({ name: "unitId" })
    unit?: Unit;

    @Column({ nullable: true })
    storeId?: string;

    @Field(() => Store, { nullable: true })
    @ManyToOne(
        () => Store,
        store => store.orders
    )
    @JoinColumn({ name: "storeId" })
    store?: Store;

    @Field(() => ChosenPayment, { nullable: true })
    @Column({
        type: "enum",
        enum: ChosenPayment,
        nullable: true
    })
    chosenPayment?: ChosenPayment;
    // chosenPayment and longPayment can be megred for better ux
    // consider that in stuff.ts we used available longPayments

    @Field(() => LongPayment, { nullable: true })
    @Column({
        type: "enum",
        enum: LongPayment,
        nullable: true
    })
    longPayment?: LongPayment;

    @Column()
    wareTypeId: string;

    @Field(() => WareType)
    @ManyToOne(
        () => WareType,
        wareType => wareType.orders
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @Column()
    wareClassId: string;

    @Field(() => WareClass)
    @ManyToOne(
        () => WareClass,
        wareClass => wareClass.orders
    )
    @JoinColumn({ name: "wareClassId" })
    wareClass: WareClass;

    @Column()
    wareGroupId: string;

    @Field(() => WareGroup, { nullable: true })
    @ManyToOne(
        () => WareGroup,
        wareGroup => wareGroup.orders
    )
    @JoinColumn({ name: "wareGroupId" })
    wareGroup?: WareGroup;

    @Column()
    wareModelId: string;

    @Field(() => WareModel)
    @ManyToOne(
        () => WareModel,
        wareModel => wareModel.orders
    )
    @JoinColumn({ name: "wareModelId" })
    wareModel: WareModel;
}
