import { City } from "../../entity/City";
import { Order } from "../../entity/Order";
import { Organization, Unit, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { UserToSite } from "../../entity/UserToSite";
import { WareGroup } from "../../entity/WareGroup";
import { AdminMiddlewares, MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyWithoutDefualtPaginationBaseResolver
} from "../base/fieldManyBaseResolver";
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
import { Order_statistic } from "../../entity/Order_statistic";
import { CreateCategoryInput } from "./domains/CreateCategory";
import {
    createCategoryValidation,
    updateCategoryValidation,
    deleteBaseValidation,
    getBaseValidation
} from "@satek/validations";

import { Category } from "../../entity/Category";

export const suffix = "Category";
const returnType = Category;
const entity = Category;
const relations = ["units", "organization", "university", "orders"];

// Check validation for createCategory ... admin can jsut create category to his organization
export const CreateCategory = createBaseResolver(
    suffix,
    returnType,
    CreateCategoryInput,
    entity,
    relations,
    AdminMiddlewares,
    createCategoryValidation
);

export const GetCategory = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    getBaseValidation,
    AdminMiddlewares
);

export const DeleteCategory = deleteBaseResolver(
    suffix,
    entity,
    MasterMiddlewares,
    deleteBaseValidation
);

export const UpdateCategory = updateBaseResolver(
    suffix,
    returnType,
    CreateCategoryInput,
    entity,
    relations,
    AdminMiddlewares,
    updateCategoryValidation
);

export const userToSites = fieldManyBaseResolver(entity, "category", UserToSite, "userToSites");

export const allowedWareGroups = fieldManyWithouRelationBaseResolver(
    entity,
    "unit",
    WareGroup,
    "allowedWareGroups"
);

export const organization = fieldOneBaseResolver(entity, "category", Organization, "organization");

export const units = fieldManyWithoutDefualtPaginationBaseResolver(
    entity,
    "category",
    Unit,
    "units"
);

export const orders = fieldManySecondBaseResolver(entity, "category", Order, "orders");

export const city = fieldOneForthBaseResolver(entity, "category", City, "city");

export const state = fieldOneSecondBaseResolver(entity, "category", State, "state");

export const university = fieldOneThirdBaseResolver(entity, "category", University, "university");

export const orderStatistic = fieldOneFifthBaseResolver(
    entity,
    "category",
    Order_statistic,
    "orderStatistic"
);
