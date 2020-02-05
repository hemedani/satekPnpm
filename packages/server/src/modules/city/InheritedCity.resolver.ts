import {
    createCityValidation,
    updateCityValidation,
    getBaseValidation,
    deleteBaseValidation
} from "@satek/validations";
import { City } from "../../entity/City";
import { Organization, Store, Unit, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import { fieldOneBaseResolver } from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateCityInput } from "./domains/CreateCityInput";

export const suffix = "City";
const returnType = City;
const entity = City;
const relations = ["state"];

export const CreateCity = createBaseResolver(
    suffix,
    returnType,
    CreateCityInput,
    entity,
    relations,
    MasterMiddlewares,
    createCityValidation
);

export const GetCity = getBaseResolver(suffix, returnType, entity, relations, getBaseValidation);

export const DeleteCity = deleteBaseResolver(
    suffix,
    entity,
    MasterMiddlewares,
    deleteBaseValidation
);

export const UpdateCity = updateBaseResolver(
    suffix,
    returnType,
    CreateCityInput,
    entity,
    relations,
    MasterMiddlewares,
    updateCityValidation
);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const state = fieldOneBaseResolver(entity, "city", State, "state");

export const universities = fieldManyBaseResolver(entity, "city", University, "universities");

export const organizations = fieldManySecondBaseResolver(
    entity,
    "city",
    Organization,
    "organizations"
);

export const stores = fieldManyThirdBaseResolver(entity, "city", Store, "stores");

export const units = fieldManyThirdBaseResolver(entity, "city", Unit, "units");
