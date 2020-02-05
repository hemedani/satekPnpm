import { Order } from "../../entity/Order";
import { Organization, Store, Unit } from "../../entity/Site";
import { Stuff } from "../../entity/Stuff";
import { User } from "../../entity/User";
import { Ware } from "../../entity/Ware";
import {
    fieldOneBaseResolver,
    fieldOneEighthBaseResolver,
    fieldOneFifthBaseResolver,
    fieldOneForthBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneSeventhBaseResolver,
    fieldOneSixthBaseResolver,
    fieldOneThirdBaseResolver,
    fieldOneEleventhBaseResolver,
    fieldOneTwelfthBaseResolver,
    fieldOneNinthBaseResolver,
    fieldOneTenthBaseResolver
} from "../base/fieldOneBaseResolver";
import { WareType } from "../../entity/WareType";
import { WareClass } from "../../entity/WareClass";
import { WareGroup } from "../../entity/WareGroup";
import { WareModel } from "../../entity/WareModel";

export const suffix = "Order";
// const returnType = Order;
export const entity = Order;
// const relations = [
//     "stuff",
//     "unit",
//     "rejectedByUser",
//     "ware",
//     "requestorUser",
//     "recipientUser",
//     "organization"
// ];

export const rejectedByUser = fieldOneBaseResolver(entity, "order", User, "rejectedByUser");

export const ware = fieldOneSecondBaseResolver(entity, "order", Ware, "ware");

export const requestorUser = fieldOneThirdBaseResolver(entity, "order", User, "requestorUser");

export const recipientUser = fieldOneForthBaseResolver(entity, "order", User, "recipientUser");

export const stuff = fieldOneFifthBaseResolver(entity, "order", Stuff, "stuff");

export const organization = fieldOneSixthBaseResolver(
    entity,
    "order",
    Organization,
    "organization"
);

export const unit = fieldOneSeventhBaseResolver(entity, "order", Unit, "unit");

export const store = fieldOneEighthBaseResolver(entity, "order", Store, "store");

export const wareType = fieldOneNinthBaseResolver(entity, "order", WareType, "wareType");

export const wareClass = fieldOneTenthBaseResolver(entity, "order", WareClass, "wareClass");

export const wareGroup = fieldOneEleventhBaseResolver(entity, "order", WareGroup, "wareGroup");

export const wareModel = fieldOneTwelfthBaseResolver(entity, "order", WareModel, "wareModel");
