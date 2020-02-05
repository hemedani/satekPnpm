import { City } from "../../entity/City";
import { Order } from "../../entity/Order";
import { Organization, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver, fieldManyThirdBaseResolver } from "../base/fieldManyBaseResolver";
import {
    fieldOneBaseResolver,
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateOrganizationInput } from "./domains/CreateOrganizationInput";

import { createOrganizationValidation, updateOrganizationValidation } from "@satek/validations";
import { Category } from "../../entity/Category";

export const suffix = "Organization";
const returnType = Organization;
const entity = Organization;
const relations: string[] = ["university"];

export const CreateOrganization = createBaseResolver(
    suffix,
    returnType,
    CreateOrganizationInput,
    entity,
    relations,
    MasterMiddlewares,
    createOrganizationValidation
);

export const GetOrganization = getBaseResolver(suffix, returnType, entity, relations);

export const DeleteOrganization = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const UpdateOrganization = updateBaseResolver(
    suffix,
    returnType,
    CreateOrganizationInput,
    entity,
    relations,
    MasterMiddlewares,
    updateOrganizationValidation
);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const categories = fieldManyBaseResolver(entity, "organization", Category, "categories");

export const university = fieldOneBaseResolver(entity, "organization", University, "university");

export const city = fieldOneSecondBaseResolver(entity, "organization", City, "city");

export const state = fieldOneThirdBaseResolver(entity, "organization", State, "state");

export const orders = fieldManyThirdBaseResolver(entity, "organization", Order, "orders");
