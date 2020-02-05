import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { FileType, UploadedFile } from "../../../entity/UploadedFile";

@InputType()
export class CreateUploadedFileInput implements Partial<UploadedFile> {
    @Field()
    @MaxLength(255)
    name: string;

    @Field(() => FileType)
    fileType: FileType;

    @Field({ nullable: true })
    description?: string;
}
