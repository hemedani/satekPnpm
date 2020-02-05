import { Order } from "../../entity/Order";
import { Store } from "../../entity/Site";
import { Stuff } from "../../entity/Stuff";
import { Ware } from "../../entity/Ware";
import { StoreHeadMiddlewares, NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { fieldManyBaseResolver } from "../base/fieldManyBaseResolver";
import {
    fieldOneBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver,
    fieldOneForthBaseResolver,
    fieldOneFifthBaseResolver,
    fieldOneSixthBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { WareModel } from "../../entity/WareModel";
import { WareType } from "../../entity/WareType";
import { WareClass } from "../../entity/WareClass";
import { WareGroup } from "../../entity/WareGroup";

export const suffix = "Stuff";
const returnType = Stuff;
const entity = Stuff;
const relations = ["wareType", "wareClass", "wareGroup", "wareModel", "ware", "orders"];

export const get = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    undefined,
    StoreHeadMiddlewares
);

export const DeleteStuff = deleteBaseResolver(suffix, entity, StoreHeadMiddlewares);

export const orders = fieldManyBaseResolver(entity, "stuff", Order, "orders");

export const wareType = fieldOneBaseResolver(entity, "stuff", WareType, "wareType");

export const wareClass = fieldOneSecondBaseResolver(entity, "stuff", WareClass, "wareClass");

export const wareGroup = fieldOneThirdBaseResolver(entity, "stuff", WareGroup, "wareGroup");

export const wareModel = fieldOneForthBaseResolver(entity, "stuff", WareModel, "wareModel");

export const ware = fieldOneFifthBaseResolver(entity, "stuff", Ware, "ware");

export const store = fieldOneSixthBaseResolver(
    entity,
    "stuff",
    Store,
    "store",
    NormalUserMiddlewares
);
