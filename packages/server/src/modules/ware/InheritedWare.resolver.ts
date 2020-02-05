import { Manufacturer } from "../../entity/Manufacturer";
import { Stuff } from "../../entity/Stuff";
import { Ware } from "../../entity/Ware";
import { WareGroup } from "../../entity/WareGroup";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver } from "../base/fieldManyBaseResolver";
import {
    fieldOneBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver,
    fieldOneForthBaseResolver,
    fieldOneFifthBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { WareType } from "../../entity/WareType";
import { WareClass } from "../../entity/WareClass";
import { WareModel } from "../../entity/WareModel";

export const suffix = "Ware";
const returnType = Ware;
const entity = Ware;
const relations = ["wareType", "wareClass", "wareGroup", "wareModel", "manufacturer", "stuffs"];

export const GetWare = getBaseResolver(suffix, returnType, entity, relations);

export const DeleteWare = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const manufacturer = fieldOneBaseResolver(entity, "ware", Manufacturer, "manufacturer");

export const wareType = fieldOneSecondBaseResolver(entity, "ware", WareType, "wareType");

export const wareClass = fieldOneThirdBaseResolver(entity, "ware", WareClass, "wareClass");

export const wareGroup = fieldOneForthBaseResolver(entity, "ware", WareGroup, "wareGroup");

export const wareModel = fieldOneFifthBaseResolver(entity, "ware", WareModel, "wareModel");

export const stuffs = fieldManyBaseResolver(entity, "ware", Stuff, "stuffs");
