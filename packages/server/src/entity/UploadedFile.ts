import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Thing } from "./Thing";
import { User } from "./User";

export enum FileType {
    Image = 1,
    Document
}

registerEnumType(FileType, {
    name: "FileType",
    description: "The type of uploaded file"
});

@ObjectType()
@Entity()
export class UploadedFile extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    name: string;

    @Field()
    @Column("varchar", { length: 255 })
    fileName: string;

    @Field()
    @Column("varchar", { length: 255 })
    mime: string;

    @Field(() => FileType)
    @Column({
        type: "enum",
        enum: FileType
    })
    fileType: FileType;

    @Field({ nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    description?: string;

    @Column({ nullable: true })
    userId?: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(
        () => User,
        user => user.uploadedFiles
    )
    @JoinColumn({ name: "userId" })
    user?: User;
}
