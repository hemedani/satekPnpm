import { Resolver, ClassType, Mutation, UseMiddleware, Arg } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import * as yup from "yup";

import { defaultMiddleWares } from "./shared/defaultMiddleWares";
import { createResolverName } from "../../utils/nameOfResolvers";
import { BadCreateError } from "../../errors/BadCreateError";

export function createBaseResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    entity: any,
    _relations: string[] = [],
    middleWare: Middleware<any>[] = [],
    validations?: yup.ObjectSchema
) {
    @Resolver()
    class BaseResolver {
        @Mutation(() => returnType, { name: createResolverName(suffix) })
        @UseMiddleware(...defaultMiddleWares(), ...middleWare)
        async create(@Arg("data", () => inputType) data: any) {
            try {
                if (validations) {
                    await validations.validate(data);
                }
                return await entity.create(data).save();
            } catch (error) {
                const msg = error.message ? error.message : "";
                throw new BadCreateError(msg);
            }
        }
    }

    return BaseResolver;
}
