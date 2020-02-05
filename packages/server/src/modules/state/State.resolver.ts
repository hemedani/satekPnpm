import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { State } from "../../entity/State";
import { getAllResolverName } from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { StateInput } from "./domains/StateInput";
import { suffix } from "./InheritedState.resolver";

@Resolver(() => State)
export class StateResolver {
    @Query(() => [State], { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares())
    async getStates(
        @Arg("data", { nullable: true }) stateInput: StateInput,
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput
    ) {
        let query: any = getRepository(State).createQueryBuilder("state");

        if (stateInput) {
            if (stateInput.document) {
                query.where("state.document @@ plainto_tsquery(:query)", {
                    query: stateInput.document
                });
            }
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);

        return query.getMany();
    }
}
