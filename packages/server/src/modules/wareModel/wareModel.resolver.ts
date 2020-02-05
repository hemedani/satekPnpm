import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { createQueryBuilder } from "typeorm";
import { PaginationInput } from "../base/domains/PaginationInput";
import { WareModel } from "../../entity/WareModel";
import { GetWareModelInput } from "./domains/GetWareModelInput";

@Resolver(() => WareModel)
export class WareModelResolver {
    @Query(() => [WareModel])
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getWareModels(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true })
        wareModelInput: GetWareModelInput
    ) {
        const query = createQueryBuilder("WareModel");
        if (wareModelInput && wareModelInput.wareGroupId) {
            query.where("WareModel.wareGroupId = :wareGroupId", {
                wareGroupId: wareModelInput.wareGroupId
            });
        } else if (wareModelInput && wareModelInput.wareClassId) {
            query.where("WareModel.wareClassId = :wareClassId", {
                wareClassId: wareModelInput.wareClassId
            });
        } else if (wareModelInput && wareModelInput.wareTypeId) {
            query.where("WareModel.wareTypeId = :wareTypeId", {
                wareTypeId: wareModelInput.wareTypeId
            });
        }
        if (wareModelInput && wareModelInput.document) {
            query.where("WareModel.document @@plainto_tsquery(:query)", {
                query: wareModelInput.document
            });
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return await query.getMany();
    }
}
