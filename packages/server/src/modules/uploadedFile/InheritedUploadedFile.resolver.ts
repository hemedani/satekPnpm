import { UploadedFile } from "../../entity/UploadedFile";
import { User } from "../../entity/User";
import { NormalUserMiddlewares, MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { fieldOneBaseResolver } from "../base/fieldOneBaseResolver";
import { getAllBaseResolver } from "../base/getAllBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";

export const suffix = "UploadedFile";
const returnType = UploadedFile;
const entity = UploadedFile;
const relations: string[] = [];
// const CreateInput = CreateUploadedFileInput;

// export const CreateUniversity = createBaseResolver(
//     suffix,
//     returnType,
//     CreateInput,
//     entity,
//     relations,
//     NormalUserMiddlewares
// );

export const GetUniversity = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    undefined,
    NormalUserMiddlewares
);

// export const DeleteUniversity = deleteBaseResolver(
//     suffix,
//     entity,
//     MasterMiddlewares
// );

// export const UpdateUniversity = updateBaseResolver(
//     suffix,
//     returnType,
//     CreateUniversityInput,
//     entity,
//     relations,
//     MasterMiddlewares
// );

export const getAll = getAllBaseResolver(suffix, returnType, entity, relations, MasterMiddlewares);

export const user = fieldOneBaseResolver(entity, "uploadedFile", User, "user");
