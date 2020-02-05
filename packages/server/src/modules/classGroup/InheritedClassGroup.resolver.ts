import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { ClassGroup } from "../../entity/ClassGroup";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { createBaseResolver } from "../base/createBaseResolver";
import { createClassGroupValidation, updateClassGroupValidation } from "@satek/validations";
import { ClassGroupInput } from "./domain/ClassGroupInput";

export const suffix = "ClassGroup";
const returnType = ClassGroup;
const entity = ClassGroup;
const relations: string[] = [];

export const CreateClassGroup = createBaseResolver(
    suffix,
    returnType,
    ClassGroupInput,
    entity,
    relations,
    MasterMiddlewares,
    createClassGroupValidation
);

export const UpdateClassGroup = updateBaseResolver(
    suffix,
    returnType,
    ClassGroupInput,
    entity,
    relations,
    MasterMiddlewares,
    updateClassGroupValidation
);

export const DeleteClassGroup = deleteBaseResolver(suffix, entity, MasterMiddlewares);
