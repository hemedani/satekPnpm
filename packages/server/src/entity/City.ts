import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Organization, Store, Unit, University } from "./Site";
import { State } from "./State";
import { Thing } from "./Thing";

@ObjectType()
@Entity()
export class City extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Column()
    stateId: string;

    @Field(() => State, { nullable: true })
    @ManyToOne(() => State)
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Field(() => [University], { nullable: true })
    @OneToMany(
        () => University,
        university => university.city
    )
    universities?: University[];

    @Field(() => [Organization], { nullable: true })
    @OneToMany(
        () => Organization,
        organization => organization.city
    )
    organizations?: Organization[];

    @Field(() => [Store], { nullable: true })
    @OneToMany(
        () => Store,
        store => store.city
    )
    stores?: Store[];

    @Field(() => [Unit], { nullable: true })
    @OneToMany(
        () => Unit,
        unit => unit.city
    )
    units?: Unit[];
}
