import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Ware } from "./Ware";
import { WareModel } from "./WareModel";
import { Thing } from "./Thing";
import { ClassGroup } from "./ClassGroup";
import { WareType } from "./WareType";
import { Stuff } from "./Stuff";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class WareGroup extends Thing {
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
        wareType => wareType.wareGroups
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @OneToMany(
        () => ClassGroup,
        classGroup => classGroup.wareGroup
    )
    classGroup?: ClassGroup[];

    @Field(() => [WareModel], { nullable: true })
    @OneToMany(
        () => WareModel,
        wareModel => wareModel.wareGroup
    )
    wareModels?: WareModel[];

    @Field(() => [Ware], { nullable: true })
    @OneToMany(
        () => Ware,
        ware => ware.wareGroup
    )
    wares?: Ware[];

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.wareGroup
    )
    stuffs?: Stuff[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.wareGroup
    )
    orders?: Order[];
}
