import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { Arg, Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { v4 } from "uuid";
import { UploadedFile } from "../../entity/UploadedFile";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadCreateError } from "../../errors/BadCreateError";
import { ServerError } from "../../errors/ServerError";
import { MyArgs } from "../../types/MyArgs";
import { Upload } from "../../types/Upload";
import { NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { createResolverName } from "../../utils/nameOfResolvers";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { CreateUploadedFileInput } from "./domains/CreateUploadedFileInput";
import { suffix } from "./InheritedUploadedFile.resolver";

@Resolver(() => UploadedFile)
export class UploadedFileResovler {
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    @Mutation(() => UploadedFile, { name: createResolverName(suffix) })
    async createUploadedFile(
        @Arg("file", () => GraphQLUpload)
        { createReadStream, filename, mimetype }: Upload,
        @Arg("data") createUplloadedFileInput: CreateUploadedFileInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }

        const pos = filename.lastIndexOf(".");
        if (pos < 0) {
            throw new ServerError();
        }
        const uploadedFileName =
            filename.substr(0, pos) +
            v4().toString() +
            filename.substr(pos, filename.length);

        return new Promise(async (res, rej) => {
            createReadStream()
                .pipe(
                    createWriteStream(
                        __dirname + `/../../../files/others/${uploadedFileName}`
                    )
                )
                .on("finish", async () => {
                    const file = await UploadedFile.create({
                        ...createUplloadedFileInput,
                        userId: user.id,
                        mime: mimetype,
                        fileName: uploadedFileName
                    })
                        .save()
                        .catch(() => {
                            // TODO: need to delete uploaded file
                            throw new BadCreateError();
                        });
                    return res(file);
                })
                .on("error", () => {
                    console.log("silam");

                    throw new ServerError();
                    rej();
                });
        });
    }
}
