import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { University } from "../../entity/Site";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { getAllResolverName } from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { UniversityInput } from "./domains/UniversityInput";
import { suffix } from "./InheritedUniversity.resolver";

@Resolver(() => University)
export class UniversityResolver {
    @Query(() => [University], { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async getUniversities(
        @Arg("data", { nullable: true }) universityInput: UniversityInput,
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput
    ) {
        let firstWhereAdded = false;
        let query: any = getRepository(University).createQueryBuilder(
            "university"
        );

        if (universityInput) {
            if (universityInput.stateId) {
                query.where("university.stateId = :stateId", {
                    stateId: universityInput.stateId
                });
                firstWhereAdded = true;
            }

            if (universityInput.document) {
                if (firstWhereAdded) {
                    query.andWhere(
                        "university.document @@ plainto_tsquery(:query)",
                        {
                            query: universityInput.document
                        }
                    );
                } else {
                    query.where(
                        "university.document @@ plainto_tsquery(:query)",
                        {
                            query: universityInput.document
                        }
                    );
                }
            }
        }
        query
            .skip((paginationInput.page - 1) * paginationInput.take)
            .take(paginationInput.take);

        return query.getMany();
    }
}
