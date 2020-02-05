import { Field, ObjectType } from "type-graphql";
import { Entity, OneToMany, Column } from "typeorm";
import { Thing } from "./Thing";
import { WareClass } from "./WareClass";
import { Ware } from "./Ware";
import { Store } from "./Site";
import { WareGroup } from "./WareGroup";
import { WareModel } from "./WareModel";
import { Stuff } from "./Stuff";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class WareType extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Field(() => [WareClass], { nullable: true })
    @OneToMany(
        () => WareClass,
        wareClass => wareClass.wareType
    )
    wareClasses?: WareClass[];

    @Field(() => [WareGroup], { nullable: true })
    @OneToMany(
        () => WareGroup,
        wareGroup => wareGroup.wareType
    )
    wareGroups?: WareGroup[];

    @Field(() => [WareModel], { nullable: true })
    @OneToMany(
        () => WareModel,
        wareModel => wareModel.wareType
    )
    wareModels?: WareModel[];

    @Field(() => [Ware], { nullable: true })
    @OneToMany(
        () => Ware,
        ware => ware.wareType
    )
    wares?: Ware[];

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.wareType
    )
    stuffs?: Stuff[];

    @Field(() => [Store], { nullable: true })
    @OneToMany(
        () => Store,
        store => store.wareType
    )
    stores?: Store[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.wareType
    )
    orders?: Order[];
}
