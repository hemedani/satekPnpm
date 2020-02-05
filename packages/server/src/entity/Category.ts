import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Order } from "./Order";
import { State } from "./State";
import { Thing } from "./Thing";
import { Organization, University, Unit } from "./Site";

@ObjectType()
@Entity()
export class Category extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    enName: string;

    @Column()
    cityId: string;

    @Field(() => City, { nullable: true })
    @ManyToOne(
        () => City,
        city => city.units
    )
    @JoinColumn({ name: "cityId" })
    city?: City;

    @Column()
    stateId: string;

    @Field(() => State, { nullable: true })
    @ManyToOne(
        () => State,
        state => state.units
    )
    @JoinColumn({ name: "stateId" })
    state?: State;

    @Column()
    organizationId: string;

    @Field(() => Organization, { nullable: true })
    @ManyToOne(
        () => Organization,
        organizatio => organizatio.categories
    )
    @JoinColumn({ name: "organizationId" })
    organization: Organization;

    @Column()
    universityId: string;

    @Field(() => University, { nullable: true })
    @ManyToOne(
        () => University,
        university => university.units
    )
    @JoinColumn({ name: "universityId" })
    university: University;

    @Field(() => [Order], { nullable: true })
    @OneToMany(
        () => Order,
        order => order.category
    )
    orders?: Order[];

    @Field(() => [Unit], { nullable: true })
    @OneToMany(
        () => Unit,
        unit => unit.category
    )
    units?: Unit[];

    /**
     * statistics
     */
    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    pendingInCatHeadNumber: number;

    @Field({ nullable: true })
    @Column("bigint", { default: 0 })
    rejectedByCatHeadNumber: number;
}
