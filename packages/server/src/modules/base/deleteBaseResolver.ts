import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { BadRemoveError } from "../../errors/BadRemoveError";
import { deleteResolverName } from "../../utils/nameOfResolvers";
import { DeleteBaseResponse } from "./boards/DeleteBaseResponse";
import { defaultMiddleWares } from "./shared/defaultMiddleWares";
import * as yup from "yup";

export function deleteBaseResolver(
    suffix: string,
    entity: any,
    middleWare: Middleware<any>[] = [],
    validations?: yup.ObjectSchema
) {
    @Resolver()
    class BaseResolver {
        @Mutation(() => DeleteBaseResponse, {
            name: deleteResolverName(suffix)
        })
        @UseMiddleware(...defaultMiddleWares(), ...middleWare)
        async get(@Arg("id", () => String) id: string) {
            let deleteResponse: any;
            try {
                if (validations) {
                    await validations.validate({ id });
                }
                deleteResponse = await entity.delete(id);
            } catch (error) {
                const msg = error.message ? error.message : "";
                throw new BadRemoveError() + " Validation Error : * " + msg + " * ";
            }
            const response: DeleteBaseResponse = {
                ok: deleteResponse.affected >= 1 ? true : false,
                id
            };
            return response;
        }
    }
    return BaseResolver;
}
