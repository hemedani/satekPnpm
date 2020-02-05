import { Resolver, Query, UseMiddleware, ClassType, Arg } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
// import * as yup from "yup";

import { defaultMiddleWares } from "./shared/defaultMiddleWares";
import { getResolverName } from "../../utils/nameOfResolvers";
import { NotFoundError } from "../../errors/NotFoundError";
import * as yup from "yup";

export function getBaseResolver<T extends ClassType>(
    suffix: string,
    returnType: T,
    entity: any,
    relations: string[] = [],
    validations?: yup.ObjectSchema,
    middleWare: Middleware<any>[] = []
) {
    @Resolver()
    class BaseResolver {
        @Query(() => returnType, { name: getResolverName(suffix) })
        @UseMiddleware(...defaultMiddleWares(), ...middleWare)
        async get(@Arg("id", () => String) id: string) {
            try {
                if (validations) {
                    await validations.validate({ id });
                }
            } catch (error) {
                const msg = error.message ? error.message : "";
                throw " * Validation Error :  " + msg + " * ";
            }
            const model = await entity.findOne({ where: { id }, relations });

            if (!model) {
                throw new NotFoundError();
            }
            return model;
        }
    }

    return BaseResolver;
}
