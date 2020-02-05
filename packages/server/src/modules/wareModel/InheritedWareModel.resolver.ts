import { Ware } from "../../entity/Ware";
import { WareClass } from "../../entity/WareClass";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver, fieldManySecondBaseResolver } from "../base/fieldManyBaseResolver";
import {
    fieldOneBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateWareModelInput } from "./domains/CreateWareModelInput";
import { WareGroup } from "../../entity/WareGroup";
import { WareModel } from "../../entity/WareModel";
import { WareType } from "../../entity/WareType";
import { Stuff } from "../../entity/Stuff";

const suffix = "WareModel";
const returnType = WareModel;
const entity = WareModel;
const relations = ["wareType", "wareClass", "wareGroup", "wares", "stuffs"];

export const CreateWareModel = createBaseResolver(
    suffix,
    returnType,
    CreateWareModelInput,
    entity,
    relations,
    MasterMiddlewares
);
export const GetWareModel = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    undefined,
    MasterMiddlewares
);

export const DeleteWareModel = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const UpdateWareModel = updateBaseResolver(
    suffix,
    returnType,
    CreateWareModelInput,
    entity,
    relations,
    MasterMiddlewares
);

export const wareType = fieldOneBaseResolver(entity, "wareModel", WareType, "wareType");

export const wareClass = fieldOneSecondBaseResolver(entity, "wareModel", WareClass, "wareClass");

export const wareGroup = fieldOneThirdBaseResolver(entity, "wareModel", WareGroup, "wareGroup");

export const wares = fieldManyBaseResolver(entity, "wareModel", Ware, "wares");

export const stuffs = fieldManySecondBaseResolver(entity, "wareModel", Stuff, "stuffs");
