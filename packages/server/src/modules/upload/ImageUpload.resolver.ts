import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { ServerError } from "../../errors/ServerError";
import { Upload } from "../../types/Upload";
import { UploadResponse } from "./boards/UploadResponse";

@Resolver()
export class ImageUpload {
    @Mutation(() => UploadResponse)
    async imageUpload(
        @Arg("image", () => GraphQLUpload)
        { createReadStream, filename }: Upload
    ): Promise<UploadResponse> {
        const pos = filename.lastIndexOf(".");
        if (pos < 0) {
            throw new ServerError();
        }
        const uploadedFileName =
            filename.substr(0, pos) + v4().toString() + filename.substr(pos, filename.length);
        const response: UploadResponse = { url: uploadedFileName };
        const badResponse: UploadResponse = { url: "" };
        return new Promise(async (res, rej) => {
            createReadStream()
                .pipe(createWriteStream(__dirname + `/../../../files/images/${uploadedFileName}`))
                .on("finish", () => res(response))
                .on("error", () => rej(badResponse));
        });
    }
}
