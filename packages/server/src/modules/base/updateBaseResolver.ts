import { Resolver, ClassType, Mutation, UseMiddleware, Arg } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import * as yup from "yup";

import { defaultMiddleWares } from "./shared/defaultMiddleWares";
import { updateResolverName } from "../../utils/nameOfResolvers";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { NotFoundError } from "../../errors/NotFoundError";

export function updateBaseResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    entity: any,
    relations: string[] = [],
    middleWare: Middleware<any>[] = [],
    validations?: yup.ObjectSchema
) {
    @Resolver()
    class BaseResolver {
        @Mutation(() => returnType, { name: updateResolverName(suffix) })
        @UseMiddleware(...defaultMiddleWares(), ...middleWare)
        async create(@Arg("id", () => String) id: string, @Arg("data", () => inputType) data: any) {
            try {
                if (validations) {
                    await validations.validate(data);
                }
                await entity.update(id, data);
            } catch (error) {
                const msg = error.message ? error.message : "";
                throw new BadUpdateError() + " * " + msg + " * ";
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
