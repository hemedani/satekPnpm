import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UploadResponse {
    @Field()
    url: string;
}
