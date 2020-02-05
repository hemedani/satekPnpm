import { Column, Entity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Thing } from "./Thing";
import { Ware } from "./Ware";

@ObjectType()
@Entity()
export class Manufacturer extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Field()
    @Column("varchar", { length: 255 })
    country: string;

    @Field(() => [Ware], { nullable: true })
    @OneToMany(
        () => Ware,
        ware => ware.manufacturer
    )
    wares?: Ware[];
}
