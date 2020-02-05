import { City } from "../../entity/City";
import { Order } from "../../entity/Order";
import { Store } from "../../entity/Site";
import { State } from "../../entity/State";
import { Stuff } from "../../entity/Stuff";
import { UserToSite } from "../../entity/UserToSite";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import { fieldManyWithouRelationBaseResolver } from "../base/fieldManyWithoutRelationResolver";
import {
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver,
    fieldOneBaseResolver,
    fieldOneForthBaseResolver,
    fieldOneFifthBaseResolver
} from "../base/fieldOneBaseResolver";
// import { getAllBaseResolver } from "../base/getAllBaseResolver";
import { StoreDetails } from "../../entity/StoreDetails";

const suffix = "Store";
// const returnType = Store;
const entity = Store;
const entityDetails = StoreDetails;
// const relations = ["userToSites"];
// const relations: string[] = [];

// export const GetStore = getBaseResolver(
//     suffix,
//     returnType,
//     entity,
//     relations,
//     StoreHeadMiddlewares
// );

export const DeleteStore = deleteBaseResolver(suffix, entity, MasterMiddlewares);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations, MasterMiddlewares);

export const userToSites = fieldManyBaseResolver(entity, "store", UserToSite, "userToSites");

export const city = fieldOneBaseResolver(entity, "store", City, "city");

export const state = fieldOneSecondBaseResolver(entity, "store", State, "state");

export const ceoCity = fieldOneThirdBaseResolver(entityDetails, "store", City, "ceoCity");

export const ceoState = fieldOneForthBaseResolver(entityDetails, "store", State, "ceoState");

export const storeDetails = fieldOneFifthBaseResolver(
    entity,
    "store",
    StoreDetails,
    "storeDetails"
);

export const orders = fieldManySecondBaseResolver(entity, "store", Order, "orders");

export const selectedStates = fieldManyWithouRelationBaseResolver(
    entity,
    "store",
    State,
    "selectedStates"
);

export const stuffs = fieldManyThirdBaseResolver(entity, "store", Stuff, "stuffs");
