import { Ware } from "../../entity/Ware";
import { WareGroup } from "../../entity/WareGroup";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { fieldOneBaseResolver } from "../base/fieldOneBaseResolver";
import { WareType } from "../../entity/WareType";
import { WareModel } from "../../entity/WareModel";
import { Stuff } from "../../entity/Stuff";
import { CreateWareGroupInput } from "./domains/CreateWareGroupInput";

const suffix = "WareGroup";
const returnType = WareGroup;
const entity = WareGroup;
const relations = ["wares"];

export const CreateWareGroup = createBaseResolver(
    suffix,
    returnType,
    CreateWareGroupInput,
    entity,
    relations,
    MasterMiddlewares
);

export const GetWareGroup = getBaseResolver(suffix, returnType, entity, relations);

export const DeleteWareGroup = deleteBaseResolver(suffix, entity, MasterMiddlewares);

// export const UpdateWareGroup = updateBaseResolver(
//     suffix,
//     returnType,
//     CreateWareGroupInput,
//     entity,
//     relations,
//     MasterMiddlewares
// );

export const wareType = fieldOneBaseResolver(entity, "wareGroup", WareType, "wareType");

export const wareModels = fieldManyBaseResolver(entity, "wareGroup", WareModel, "wareModels");

export const wares = fieldManySecondBaseResolver(entity, "wareGroup", Ware, "wares");

export const stuffs = fieldManyThirdBaseResolver(entity, "wareGroup", Stuff, "stuffs");
