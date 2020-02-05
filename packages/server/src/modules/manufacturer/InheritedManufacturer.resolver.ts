import { Manufacturer } from "../../entity/Manufacturer";
import { Ware } from "../../entity/Ware";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver } from "../base/fieldManyBaseResolver";
import { getAllBaseResolver } from "../base/getAllBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateManufacturerInput } from "./domains/CreateManufacturerInput";
import {
    createManufacturerValidation,
    updateManufacturerValidation,
    deleteBaseValidation,
    getBaseValidation
} from "@satek/validations";

const suffix = "Manufacturer";
const returnType = Manufacturer;
const entity = Manufacturer;
const relations = ["wares"];
const CreateInput = CreateManufacturerInput;

export const Create = createBaseResolver(
    suffix,
    returnType,
    CreateInput,
    entity,
    relations,
    MasterMiddlewares,
    createManufacturerValidation
);

export const Get = getBaseResolver(suffix, returnType, entity, relations, getBaseValidation);

export const Delete = deleteBaseResolver(suffix, entity, MasterMiddlewares, deleteBaseValidation);

export const Update = updateBaseResolver(
    suffix,
    returnType,
    CreateInput,
    entity,
    relations,
    MasterMiddlewares,
    updateManufacturerValidation
);

export const getAll = getAllBaseResolver(suffix, returnType, entity, relations, MasterMiddlewares);

export const wares = fieldManyBaseResolver(entity, "manufacturer", Ware, "wares");
