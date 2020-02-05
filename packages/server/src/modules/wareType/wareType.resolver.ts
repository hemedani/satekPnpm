import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { createQueryBuilder } from "typeorm";
import { PaginationInput } from "../base/domains/PaginationInput";
import { WareType } from "../../entity/WareType";
import { GetWareTypeInput } from "./domains/GetWareTypeInput";

@Resolver(() => WareType)
export class WareTypeResolver {
    @Query(() => [WareType])
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getWareTypes(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true })
        wareTypeInput: GetWareTypeInput
    ) {
        const query = createQueryBuilder("WareType");
        if (wareTypeInput && wareTypeInput.document) {
            query.where("WareType.document @@plainto_tsquery(:document)", {
                document: wareTypeInput.document
            });
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return await query.getMany();
    }
}
