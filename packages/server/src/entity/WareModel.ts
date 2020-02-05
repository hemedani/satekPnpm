import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Thing } from "./Thing";
import { Ware } from "./Ware";
import { WareClass } from "./WareClass";
import { WareGroup } from "./WareGroup";
import { WareType } from "./WareType";
import { Stuff } from "./Stuff";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class WareModel extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Column()
    wareTypeId: string;

    @Field(() => WareType)
    @ManyToOne(
        () => WareType,
        wareType => wareType.wareModels
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @Column()
    wareClassId: string;

    @Field(() => WareClass)
    @ManyToOne(
        () => WareClass,
        wareClass => wareClass.wareModels
    )
    @JoinColumn({ name: "wareClassId" })
    wareClass: WareClass;

    @Column()
    wareGroupId: string;

    @Field(() => WareGroup)
    @ManyToOne(
        () => WareGroup,
        wareGroup => wareGroup.wareModels
    )
    @JoinColumn({ name: "wareGroupId" })
    wareGroup: WareGroup;

    @Field(() => [Ware], { nullable: true })
    @OneToMany(
        () => Ware,
        ware => ware.wareModel
    )
    wares?: Ware[];

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.wareModel
    )
    stuffs?: Stuff[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.wareModel
    )
    orders?: Order[];
}
