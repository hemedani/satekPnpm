import { Field, ObjectType, Root } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { Thing } from "./Thing";
import { UploadedFile } from "./UploadedFile";
import { UserToSite } from "./UserToSite";
import { Ware } from "./Ware";

@ObjectType()
@Entity()
export class User extends Thing {
    @Field()
    @Column("varchar", { unique: true, length: 255 })
    ssn: string;

    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    photoUrl: string;

    @Field()
    @Column("varchar", { length: 255 })
    firstName: string;

    @Field()
    @Column("varchar", { length: 255 })
    lastName: string;

    @Field(() => String)
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Column("bigint", { unique: true })
    phone: number;

    @Field({ deprecationReason: "Use `phoneNumber` instead of `phone` to get string" })
    get phoneNumber(): string {
        return String(this.phone);
    }

    @Field(() => [String])
    @Column("simple-array")
    devices: string[];

    @Column("varchar", { length: 255, nullable: true })
    password?: string;

    @Field(() => [String], { nullable: true })
    @Column("simple-array", { nullable: true })
    allowedWaresIds?: string[];

    @Field(() => [String], { nullable: true })
    @Column("simple-array", { nullable: true })
    favoriteWaresIds?: string[];

    @Field(() => [Ware], { nullable: true })
    favoriteWares?: Ware[];

    @Field(() => [UploadedFile], { nullable: true })
    @OneToMany(
        () => UploadedFile,
        uploadedFile => uploadedFile.user
    )
    uploadedFiles?: UploadedFile[];

    @Field(() => [UserToSite], { nullable: true })
    @OneToMany(
        () => UserToSite,
        userToSite => userToSite.user
    )
    userToSites?: UserToSite[];

    //sotreHead is actived by admin to be able to login
    @Field()
    @Column({ default: false })
    isActive?: boolean;
}
