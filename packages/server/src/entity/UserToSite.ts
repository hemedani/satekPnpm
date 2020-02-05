import { registerEnumType, Field, ObjectType } from "type-graphql";
import { Column, ManyToOne, Entity, JoinColumn } from "typeorm";

import { Thing } from "./Thing";
import { User } from "./User";
import { Site } from "./Site";

export enum UserRole {
    Master = "MasterAdmin",
    Admin = "Admin",
    DiagnosisPosition = "DiagnosisPosition",
    OrganizationHead = "Organization.Head",
    FinanceHead = "Finance.Head",
    FinanceEmployee = "Finance",
    Expert = "Expert",
    UnitHead = "Unit.Head",
    UnitEmployee = "Unit",
    UniversityHead = "University.Head",
    StoreHead = "Store.Head",
    Normal = "Normal",
    Supplier = "Supplier",
    Stockclerk = "Stockclerk",
    Accountant = "Accountant",
    Minister = "Minister"
}

registerEnumType(UserRole, {
    name: "UserRole",
    description: "The role enums for user access level"
});

@ObjectType()
@Entity()
export class UserToSite extends Thing {
    @Field(() => UserRole)
    @Column({
        type: "text",
        // enum: UserRole,
        default: UserRole.Normal
    })
    role: UserRole;

    @Column()
    userId: string;

    // Can be nullable for master
    @Column({ nullable: true })
    siteId?: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(
        () => User,
        user => user.userToSites
    )
    @JoinColumn({ name: "userId" })
    user?: User;

    @Field(() => Site, { nullable: true })
    @ManyToOne(
        () => Site,
        site => site.userToSites
    )
    @JoinColumn({ name: "siteId" })
    site?: Site;
}
