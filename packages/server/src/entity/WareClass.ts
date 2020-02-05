import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { WareType } from "./WareType";
import { Ware } from "./Ware";
import { Thing } from "./Thing";
import { ClassGroup } from "./ClassGroup";
import { WareModel } from "./WareModel";
import { Stuff } from "./Stuff";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class WareClass extends Thing {
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
        wareType => wareType.wareClasses
    )
    @JoinColumn({ name: "wareTypeId" })
    wareType: WareType;

    @OneToMany(
        () => ClassGroup,
        classGroup => classGroup.wareClass
    )
    classGroup?: ClassGroup[];

    @Field(() => [WareModel], { nullable: true })
    @OneToMany(
        () => WareModel,
        wareModel => wareModel.wareClass
    )
    wareModels?: WareModel[];

    @Field(() => [Ware], { nullable: true })
    @OneToMany(
        () => Ware,
        ware => ware.wareClass
    )
    wares?: Ware[];

    @Field(() => [Stuff], { nullable: true })
    @OneToMany(
        () => Stuff,
        stuff => stuff.wareClass
    )
    stuffs?: Stuff[];

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.wareClass
    )
    orders?: Order[];
}
