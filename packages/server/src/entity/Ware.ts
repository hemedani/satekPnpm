import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Manufacturer } from "./Manufacturer";
import { Order } from "./Order";
import { Stuff } from "./Stuff";
import { Thing } from "./Thing";
import { WareGroup } from "./WareGroup";
import { WareType } from "./WareType";
import { WareClass } from "./WareClass";
import { WareModel } from "./WareModel";
import { GraphQLFloat } from "graphql";

@ObjectType()
@Entity()
export class Ware extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    enName?: string;

    @Field()
    @Column("varchar", { length: 255 })
    brand: string;

    @Field()
    @Column("bigint")
    price: number;

    @Field()
    @Column("varchar", { length: 255 })
    manufacturername: string;

    @Field(() => Int)
    @Column("bigint", { default: 0 })
    orderedNumber: number;

    @Field()
    @Column("varchar", { length: 30 })
    irc: string;

    @Field(() => Int, { nullable: true })
    @Column("int", { nullable: true })
    umdns?: number;

    @Field(() => GraphQLFloat, { nullable: true })
    @Column("bigint", { nullable: true })
    gtin?: number;

    @Column()
    manufacturerId: string;

    @Field(() => Manufacturer, { nullable: true })
    @ManyToOne(
        () => Manufacturer,
        Manufacturer => Manufacturer.wares
    )
    @JoinColumn({ name: "manufacturerId" })
    manufacturer?: Manufacturer;

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.ware
    )
    stuffs?: Stuff[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.ware
    )
    orders?: Order[];

    @Column()
    wareTypeId: string;

    @Field(() => WareType)
    @ManyToOne(
        () => WareType,
        wareType => wareType.wares
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @Column()
    wareClassId: string;

    @Field(() => WareClass)
    @ManyToOne(
        () => WareClass,
        wareClass => wareClass.wares
    )
    @JoinColumn({ name: "wareClassId" })
    wareClass: WareClass;

    @Column()
    wareGroupId: string;

    @Field(() => WareGroup, { nullable: true })
    @ManyToOne(
        () => WareGroup,
        wareGroup => wareGroup.wares
    )
    @JoinColumn({ name: "wareGroupId" })
    wareGroup?: WareGroup;

    @Column()
    wareModelId: string;

    @Field(() => WareModel)
    @ManyToOne(
        () => WareModel,
        wareModel => wareModel.wares
    )
    @JoinColumn({ name: "wareModelId" })
    wareModel: WareModel;

    // increament orderedNumber atomic
    static increamentOrderedNumber(id: string) {
        return this.getRepository().increment({ id }, "orderedNumber", 1);
    }
}
