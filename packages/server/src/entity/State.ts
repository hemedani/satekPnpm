import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { City } from "./City";
import { Organization, Store, Unit, University } from "./Site";
import { Thing } from "./Thing";

@ObjectType()
@Entity()
export class State extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Field(() => [City], { nullable: true })
    @OneToMany(
        () => City,
        city => city.state
    )
    cities?: City[];

    @Field(() => [University], { nullable: true })
    @OneToMany(
        () => University,
        university => university.state
    )
    universities?: University[];

    @Field(() => [Organization], { nullable: true })
    @OneToMany(
        () => Organization,
        organization => organization.state
    )
    organizations?: Organization[];

    @Field(() => [Store], { nullable: true })
    @OneToMany(
        () => Store,
        store => store.state
    )
    stores?: Store[];

    @Field(() => [Unit], { nullable: true })
    @OneToMany(
        () => Unit,
        unit => unit.state
    )
    units?: Unit[];
}
