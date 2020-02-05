import { City } from "../../entity/City";
import { Order } from "../../entity/Order";
import { Organization, Unit, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { UserToSite } from "../../entity/UserToSite";
import { WareGroup } from "../../entity/WareGroup";
import {
    AdminMiddlewares,
    MasterMiddlewares,
    // UnitUserMiddlewares,
    NormalUserMiddlewares
} from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver, fieldManySecondBaseResolver } from "../base/fieldManyBaseResolver";
import { fieldManyWithouRelationBaseResolver } from "../base/fieldManyWithoutRelationResolver";
import {
    fieldOneBaseResolver,
    fieldOneForthBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver,
    fieldOneFifthBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateUnitInput } from "./domains/CreateUnitInput";
import { Order_statistic } from "../../entity/Order_statistic";

export const suffix = "Unit";
const returnType = Unit;
const entity = Unit;
const relations = ["userToSites", "organization", "category", "orders"];

// Check validation for createUnit ... admin can jsut create unit to his organization
export const CreateUnit = createBaseResolver(
    suffix,
    returnType,
    CreateUnitInput,
    entity,
    relations,
    AdminMiddlewares
);

export const GetUnit = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    undefined,
    NormalUserMiddlewares //should be admin and storeHead
);

export const DeleteUnit = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const UpdateUnit = updateBaseResolver(
    suffix,
    returnType,
    CreateUnitInput,
    entity,
    relations,
    AdminMiddlewares
);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const userToSites = fieldManyBaseResolver(entity, "unit", UserToSite, "userToSites");

export const allowedWareGroups = fieldManyWithouRelationBaseResolver(
    entity,
    "unit",
    WareGroup,
    "allowedWareGroups"
);

export const organization = fieldOneBaseResolver(entity, "unit", Organization, "organization");

export const orders = fieldManySecondBaseResolver(entity, "unit", Order, "orders");

export const city = fieldOneForthBaseResolver(entity, "unit", City, "city");

export const state = fieldOneSecondBaseResolver(entity, "unit", State, "state");

export const university = fieldOneThirdBaseResolver(entity, "unit", University, "university");

export const orderStatistic = fieldOneFifthBaseResolver(
    entity,
    "unit",
    Order_statistic,
    "orderStatistic"
);
