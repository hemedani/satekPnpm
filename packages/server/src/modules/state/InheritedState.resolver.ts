import { City } from "../../entity/City";
import { Organization, Store, Unit, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManyFourthBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateStateInput } from "./domains/CreateStateInput";
import { createStateValidation, updateStateValidation } from "@satek/validations";

export const suffix = "State";
const returnType = State;
const entity = State;
const relations = ["cities"];

export const CreateState = createBaseResolver(
    suffix,
    returnType,
    CreateStateInput,
    entity,
    relations,
    MasterMiddlewares,
    createStateValidation
);

export const GetState = getBaseResolver(suffix, returnType, entity, relations);

export const DeleteState = deleteBaseResolver(suffix, entity, MasterMiddlewares);

export const UpdateState = updateBaseResolver(
    suffix,
    returnType,
    CreateStateInput,
    entity,
    relations,
    MasterMiddlewares,
    updateStateValidation
);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const cities = fieldManyBaseResolver(entity, "state", City, "cities");

export const universities = fieldManyFourthBaseResolver(
    entity,
    "state",
    University,
    "universities"
);

export const organizations = fieldManySecondBaseResolver(
    entity,
    "state",
    Organization,
    "organizations"
);

export const stores = fieldManyThirdBaseResolver(entity, "state", Store, "stores");

export const units = fieldManyThirdBaseResolver(entity, "state", Unit, "units");
