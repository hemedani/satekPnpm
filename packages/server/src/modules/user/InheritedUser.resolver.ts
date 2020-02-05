import { User } from "../../entity/User";
import { UserToSite } from "../../entity/UserToSite";
import { Ware } from "../../entity/Ware";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { deleteBaseResolver } from "../base/deleteBaseResolver";
import { fieldManyBaseResolver } from "../base/fieldManyBaseResolver";
import {
    fieldManyWithouRelationBaseResolver,
    fieldManyWithouRelationSecondBaseResolver
} from "../base/fieldManyWithoutRelationResolver";
import { getBaseResolver } from "../base/getBaseResolver";

export const suffix = "User";
const returnType = User;
const entity = User;
const relations = ["userToSites"];

export const get = getBaseResolver(suffix, returnType, entity, relations);

export const del = deleteBaseResolver(suffix, entity, MasterMiddlewares);

// TODO: create a custom updateUser for hashing password

// export const UpdateUniversity = updateBaseResolver(
//     suffix,
//     returnType,
//     CreateUniversityInput,
//     entity,
//     relations,
//     MasterMiddlewares
// );

// export const getAll = getAllBaseResolver(suffix, returnType, entity, relations);

export const userToSites = fieldManyBaseResolver(
    entity,
    "user",
    UserToSite,
    "userToSites"
);

export const allowedWares = fieldManyWithouRelationBaseResolver(
    entity,
    "user",
    Ware,
    "allowedWares"
);

export const favoriteWares = fieldManyWithouRelationSecondBaseResolver(
    entity,
    "user",
    Ware,
    "favoriteWares"
);
