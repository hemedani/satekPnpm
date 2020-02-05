import { Field, ObjectType, registerEnumType, Int } from "type-graphql";
import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    TableInheritance,
    OneToOne
} from "typeorm";
import { City } from "./City";
import { Order } from "./Order";
import { State } from "./State";
import { Stuff } from "./Stuff";
import { Thing } from "./Thing";
import { UserToSite } from "./UserToSite";
import { WareGroup } from "./WareGroup";
import { StoreDetails } from "./StoreDetails";
import { Order_statistic } from "./Order_statistic";
import { WareType } from "./WareType";
import { Category } from "./Category";

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Site extends Thing {
    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    logoUrl?: string;

    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 510 })
    address: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    location?: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    contact?: string;

    @Field(() => [UserToSite], { nullable: true })
    @OneToMany(
        () => UserToSite,
        userToSite => userToSite.site
    )
    userToSites?: UserToSite[];
}

@ObjectType()
@ChildEntity()
export class University extends Site {
    @Column()
    cityId: string;

    @Column()
    stateId: string;

    @Field(() => City, { nullable: true })
    @ManyToOne(
        () => City,
        city => city.universities
    )
    @JoinColumn({ name: "cityId" })
    city?: City;

    @Field(() => State, { nullable: true })
    @ManyToOne(
        () => State,
        state => state.universities
    )
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Field(() => [Organization], { nullable: true })
    @OneToMany(
        () => Organization,
        organization => organization.university
    )
    organizations?: Organization[];

    @Field(() => [Unit], { nullable: true })
    @OneToMany(
        () => Unit,
        unit => unit.university
    )
    units?: Unit[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.organization
    )
    orders?: Order[];
}

@ObjectType()
@ChildEntity()
export class Organization extends Site {
    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.university
    )
    orders?: Order[];

    @Column()
    cityId: string;

    @Column()
    stateId: string;

    @Field(() => City, { nullable: true })
    @ManyToOne(
        () => City,
        city => city.organizations
    )
    @JoinColumn({ name: "cityId" })
    city?: City;

    @Field(() => State, { nullable: true })
    @ManyToOne(
        () => State,
        state => state.organizations
    )
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Field(() => [Category], { nullable: true })
    @OneToMany(
        () => Category,
        category => category.organization
    )
    categories?: Category[];

    @Column()
    universityId: string;

    @Field(() => University, { nullable: true })
    @ManyToOne(
        () => University,
        university => university.organizations
    )
    @JoinColumn({ name: "universityId" })
    university?: University;

    /**
     * statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInOrgHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByOrgHeadNumber: number;
}

export enum StoreStatus {
    NotConfirmed = 1,
    Confirmed,
    Suspension
}

registerEnumType(StoreStatus, {
    name: "StoreStatus",
    description: "An enum for store status"
});

export enum WorkingShift {
    Morning = 1,
    MorningAndAfternoon,
    AllDayLong
}

registerEnumType(WorkingShift, {
    name: "WorkingShift",
    description: "An enum for working shifts"
});

export enum PaymentDeadLine {
    OneMonth = 1,
    ThreeMonth,
    SixMonth
}

registerEnumType(PaymentDeadLine, {
    name: "PaymentDeadLine",
    description: "An enum for payment dead-line"
});

export enum ServiceRange {
    City = 1,
    State,
    SelectedStates,
    Country
}

registerEnumType(ServiceRange, {
    name: "ServiceRange",
    description: "An enum for service range"
});

export enum DeliveryTime {
    OneDay = 1,
    TwoDay,
    ThreeDay,
    fourDay,
    fiveDay,
    sixDay,
    sevenDay,
    eightDay,
    nineDay,
    tenDay
}

registerEnumType(DeliveryTime, {
    name: "DeliveryTime",
    description: "An enum for Delivery Time"
});

export enum ActivityScope {
    Medicine = 1,
    Drug,
    Other
}

registerEnumType(ActivityScope, {
    name: "ActivityScope",
    description: "An enum for Activity Scope"
});

export enum ActivityType {
    Manufacturer = 1,
    Importer,
    Wholesaler,
    Dropshipper
}

registerEnumType(ActivityType, {
    name: "ActivityType",
    description: "An enum for Activity Type"
});
@ObjectType()
@ChildEntity()
export class Store extends Site {
    @Field()
    @Column("varchar", { length: 255 })
    ceoname: string;

    @Field(() => DeliveryTime)
    @Column({
        type: "enum",
        enum: DeliveryTime
    })
    cityDeliveryTime: DeliveryTime;

    @Field(() => [String], { nullable: true })
    @Column("simple-array", { nullable: true })
    selectedStatesIds?: string[];

    @Field(() => [State], { nullable: true })
    selectedStates?: State[];

    @Field(() => DeliveryTime, { nullable: true })
    @Column({
        type: "enum",
        enum: DeliveryTime,
        nullable: true
    })
    stateDeliveryTime?: DeliveryTime;

    @Field(() => DeliveryTime, { nullable: true })
    @Column({
        type: "enum",
        enum: DeliveryTime,
        nullable: true
    })
    selectedStateDeliveryTime?: DeliveryTime;

    @Field(() => ActivityType, { nullable: true })
    @Column({
        type: "enum",
        enum: ActivityType,
        nullable: true
    })
    activityType: ActivityType;

    @Field(() => DeliveryTime, { nullable: true })
    @Column({
        type: "enum",
        enum: DeliveryTime,
        nullable: true
    })
    countryDeliveryTime?: DeliveryTime;

    @Field(() => WorkingShift)
    @Column({
        type: "enum",
        enum: WorkingShift,
        default: WorkingShift.Morning
    })
    workingShift: WorkingShift;

    @Field(() => PaymentDeadLine)
    @Column({
        type: "enum",
        enum: PaymentDeadLine,
        default: PaymentDeadLine.OneMonth
    })
    paymentDeadLine: PaymentDeadLine;

    @Field(() => [ServiceRange])
    @Column({
        type: "enum",
        enum: ServiceRange,
        array: true
    })
    serviceRange: ServiceRange[];

    @Field()
    @Column()
    fastDelivery: boolean;

    @Field(() => ActivityScope)
    @Column({
        type: "enum",
        enum: ActivityScope
    })
    activityScope: ActivityScope;

    @Column()
    storeDetailsId: string;

    @Field(() => StoreDetails)
    @OneToOne(
        () => StoreDetails,
        storeDetails => storeDetails.store
    )
    @JoinColumn({ name: "storeDetailsId" })
    storeDetails: StoreDetails;

    @Field(() => StoreStatus)
    @Column({
        type: "enum",
        enum: StoreStatus,
        default: StoreStatus.NotConfirmed
    })
    status: StoreStatus;

    @Field()
    @Column()
    updateStatusDescription: string;

    @Column()
    cityId: string;

    @Field(() => City, { nullable: true })
    @ManyToOne(
        () => City,
        city => city.stores
    )
    @JoinColumn({ name: "cityId" })
    city?: City;

    @Column()
    stateId: string;

    @Field(() => State, { nullable: true })
    @ManyToOne(
        () => State,
        state => state.stores
    )
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.store
    )
    stuffs?: Stuff[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.store
    )
    orders?: Order[];

    @Field(() => Int, { nullable: true })
    @Column("int", { nullable: true })
    score?: number;

    @Field(() => Int)
    @Column("bigint", { default: 0 })
    totalSoldAmount?: number;

    @Field(() => Int)
    @Column("bigint", { default: 0 })
    totalSoldNum?: number;

    @Field(() => Int)
    @Column("bigint", { default: 0 })
    totalPaid?: number;

    @Field(() => Int)
    @Column("bigint", { default: 0 })
    totalNotPaid?: number;

    @Column()
    wareTypeId: string;

    @Field(() => WareType)
    @ManyToOne(
        () => WareType,
        wareType => wareType.stores
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;
}

@ObjectType()
@ChildEntity()
export class Unit extends Site {
    @Column()
    orderStatisticId: string;

    @Field(() => Order_statistic, { nullable: true })
    @OneToOne(
        () => Order_statistic,
        Order_statistic => Order_statistic.unit
    )
    @JoinColumn({ name: "orderStatisticId" })
    orderStatistic: Order_statistic;

    @Column()
    cityId: string;

    @Column()
    stateId: string;

    @Field(() => City, { nullable: true })
    @ManyToOne(
        () => City,
        city => city.units
    )
    @JoinColumn({ name: "cityId" })
    city?: City;

    @Field(() => State, { nullable: true })
    @ManyToOne(
        () => State,
        state => state.units
    )
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Field(() => [String], { nullable: true })
    @Column("simple-array", { nullable: true })
    allowedWareGroupsIds: string[];

    @Field(() => [WareGroup], { nullable: true })
    allowedWareGroups: WareGroup[];

    @Column()
    organizationId: string;

    @Field(() => Organization, { nullable: true })
    @ManyToOne(() => Organization)
    @JoinColumn({ name: "organizationId" })
    organization?: Organization;

    @Column()
    universityId: string;

    @Field(() => University, { nullable: true })
    @ManyToOne(
        () => University,
        university => university.units
    )
    @JoinColumn({ name: "universityId" })
    university?: University;

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.unit
    )
    orders?: Order[];

    @Column()
    categoryId?: string;

    @Field(() => Category, { nullable: true })
    @ManyToOne(
        () => Category,
        category => category.units
    )
    @JoinColumn({ name: "categoryId" })
    category?: Category;

    /**
     * statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInUnitHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByUnitHeadNumber: number;
}
