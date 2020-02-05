import { Ware } from "../../entity/Ware";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManySecondBaseResolver,
    fieldManyBaseResolver,
    fieldManyThirdBaseResolver,
    fieldManyFourthBaseResolver,
    fieldManyFifthBaseResolver
} from "../base/fieldManyBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateWareTypeInput } from "./domains/CreateWareTypeInput";
import { WareType } from "../../entity/WareType";
import { WareGroup } from "../../entity/WareGroup";
import { WareClass } from "../../entity/WareClass";
import { WareModel } from "../../entity/WareModel";
import { Stuff } from "../../entity/Stuff";

const suffix = "WareType";
const returnType = WareType;
const entity = WareType;
const relations = ["wareClasses", "wareGroups", "wareModels", "wares", "stuffs"];

export const CreateWareType = createBaseResolver(
    suffix,
    returnType,
    CreateWareTypeInput,
    entity,
    relations,
    MasterMiddlewares
);
export const GetWareType = getBaseResolver(
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
    CreateWareTypeInput,
    entity,
    relations,
    MasterMiddlewares
);

export const wareGroups = fieldManyBaseResolver(entity, "wareType", WareGroup, "wareGroups");

export const wareClasses = fieldManySecondBaseResolver(
    entity,
    "wareType",
    WareClass,
    "wareClasses"
);

export const wareModels = fieldManyThirdBaseResolver(entity, "wareType", WareModel, "wareModels");

export const wares = fieldManyFourthBaseResolver(entity, "wareType", Ware, "wares");

export const stuffs = fieldManyFifthBaseResolver(entity, "wareType", Stuff, "stuffs");
