import { Site } from "../../entity/Site";
import { User } from "../../entity/User";
import { UserToSite } from "../../entity/UserToSite";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import {
    fieldOneBaseResolver,
    fieldOneSecondBaseResolver
} from "../base/fieldOneBaseResolver";
import { getAllBaseResolver } from "../base/getAllBaseResolver";
import { CreateUserToSiteInput } from "./domains/CreateUserToSiteInput";

export const suffix = "UserToSite";
export const returnType = UserToSite;
export const entity = UserToSite;
export const relations = ["user", "site"];
export const CreateInput = CreateUserToSiteInput;

// export const Create = createBaseResolver(
//     suffix,
//     returnType,
//     CreateInput,
//     entity,
//     relations
// )

// export const Get = getBaseResolver(
//     suffix,
//     returnType,
//     entity,
//     relations,
//     NormalUserMiddlewares
// );

// export const Delete = deleteBaseResolver(
//     suffix,
//     entity
// )

// export const Update = updateBaseResolver(
//     suffix,
//     returnType,
//     CreateInput,
//     entity,
//     relations
// )

export const getAll = getAllBaseResolver(
    suffix,
    returnType,
    entity,
    relations,
    MasterMiddlewares
);

export const site = fieldOneBaseResolver(entity, "userToSite", Site, "site");

export const user = fieldOneSecondBaseResolver(
    entity,
    "userToSite",
    User,
    "user"
);
