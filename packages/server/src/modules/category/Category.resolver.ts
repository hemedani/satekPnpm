import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { AdminMiddlewares } from "../../utils/CommonMiddlewareList";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { Category } from "../../entity/Category";
import { GetCategoryInput } from "./domains/GetCategroyInput";
import { paginationInputValidation, getCategoriesInputValidation } from "@satek/validations";

@Resolver(() => Category)
export class CategoryResovler {
    @Query(() => [Category])
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async getCategories(
        @Arg("data", { nullable: true }) categoryInput: GetCategoryInput,
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput
    ) {
        try {
            await paginationInputValidation.validate(paginationInput);

            const query = getRepository(Category).createQueryBuilder("category");

            if (categoryInput) {
                await getCategoriesInputValidation.validate(categoryInput);

                if (categoryInput.name) {
                    query.where("category.name = :name", {
                        name: categoryInput.name
                    });
                }
                if (categoryInput.enName) {
                    query.andWhere("category.enName = :enName", {
                        enName: categoryInput.enName
                    });
                }
                if (categoryInput.stateId) {
                    query.andWhere("category.stateId = :stateId", {
                        stateId: categoryInput.stateId
                    });
                }
                if (categoryInput.cityId) {
                    query.andWhere("category.cityId = :cityId", {
                        cityId: categoryInput.cityId
                    });
                }
                if (categoryInput.organizationId) {
                    query.andWhere("category.organizationId = :organizationId", {
                        organizationId: categoryInput.organizationId
                    });
                }
                if (categoryInput.unitId) {
                    query.andWhere("category.unitId = :unitId", {
                        unitId: categoryInput.unitId
                    });
                }
            }

            query
                .skip((paginationInput.page - 1) * paginationInput.take)
                .take(paginationInput.take);
            return await query.getMany();
        } catch (error) {
            const msg = error.message ? error.message : "";

            throw " Validation Error : * " + msg + " * ";
        }
    }
}
