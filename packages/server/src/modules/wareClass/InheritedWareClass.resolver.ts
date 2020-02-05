import { WareClass } from "../../entity/WareClass";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateWareClassInput } from "./domains/CreateWareClassInput";
import { fieldOneBaseResolver } from "../base/fieldOneBaseResolver";
import { WareType } from "../../entity/WareType";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import { Ware } from "../../entity/Ware";
import { WareModel } from "../../entity/WareModel";
import { Stuff } from "../../entity/Stuff";

const suffix = "WareClass";
const returnType = WareClass;
const entity = WareClass;
const relations = ["wareType", "wares"];

export const CreateWareClass = createBaseResolver(
    //duplicate?
    suffix,
    returnType,
    CreateWareClassInput,
    entity,
    relations,
    MasterMiddlewares
);

export const GetWareClass = getBaseResolver(suffix, returnType, entity, relations);

export const DeleteWareClass = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const UpdateWareClass = updateBaseResolver(
    suffix,
    returnType,
    CreateWareClassInput,
    entity,
    relations,
    MasterMiddlewares
);

export const wareType = fieldOneBaseResolver(entity, "wareClass", WareType, "wareType");

export const wareModels = fieldManyBaseResolver(entity, "wareClass", WareModel, "wareModels");

export const wares = fieldManySecondBaseResolver(entity, "wareClass", Ware, "wares");

export const stuffs = fieldManyThirdBaseResolver(entity, "wareClass", Stuff, "stuffs");
