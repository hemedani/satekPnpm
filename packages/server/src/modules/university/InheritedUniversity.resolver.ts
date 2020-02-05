import { City } from "../../entity/City";
import { Organization, Unit, University } from "../../entity/Site";
import { State } from "../../entity/State";
import { UserToSite } from "../../entity/UserToSite";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createBaseResolver } from "../base/createBaseResolver";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import {
    fieldManyBaseResolver,
    fieldManySecondBaseResolver,
    fieldManyThirdBaseResolver
} from "../base/fieldManyBaseResolver";
import {
    fieldOneSecondBaseResolver,
    fieldOneThirdBaseResolver
} from "../base/fieldOneBaseResolver";
import { getBaseResolver } from "../base/getBaseResolver";
import { updateBaseResolver } from "../base/updateBaseResolver";
import { CreateUniversityInput } from "./domains/CreateUniversityInput";

export const suffix = "University";
const returnType = University;
const entity = University;
const relations: string[] = [];

export const CreateUniversity = createBaseResolver(
    suffix,
    returnType,
    CreateUniversityInput,
    entity,
    relations,
    MasterMiddlewares
);

export const GetUniversity = getBaseResolver(
    suffix,
    returnType,
    entity,
    relations
);

export const DeleteUniversity = deleteBaseResolver(
    suffix,
    entity,
    MasterMiddlewares
);

export const UpdateUniversity = updateBaseResolver(
    suffix,
    returnType,
    CreateUniversityInput,
    entity,
    relations,
    MasterMiddlewares
);

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const userToSites = fieldManyBaseResolver(
    entity,
    "university",
    UserToSite,
    "userToSites"
);

export const organizations = fieldManySecondBaseResolver(
    entity,
    "university",
    Organization,
    "organizations"
);

export const city = fieldOneSecondBaseResolver(
    entity,
    "university",
    City,
    "city"
);

export const state = fieldOneThirdBaseResolver(
    entity,
    "university",
    State,
    "state"
);

export const units = fieldManyThirdBaseResolver(
    entity,
    "university",
    Unit,
    "units"
);
