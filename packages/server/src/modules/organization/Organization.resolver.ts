import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { Organization } from "../../entity/Site";
import { MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { getAllResolverName } from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { OrganizationInput } from "./domains/OrganizationInput";
import { suffix } from "./InheritedOrganization.resolver";

@Resolver(() => Organization)
export class OrganizationResolver {
    @Query(() => [Organization], { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async getOrganization(
        @Arg("data", { nullable: true }) organizationInput: OrganizationInput,
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput
    ) {
        let firstWhereAdded = false;
        let query: any = getRepository(Organization).createQueryBuilder(
            "organization"
        );

        if (organizationInput) {
            if (organizationInput.universityId) {
                query.where("organization.universityId = :universityId", {
                    universityId: organizationInput.universityId
                });
                firstWhereAdded = true;
            }

            if (organizationInput.document) {
                if (firstWhereAdded) {
                    query.andWhere(
                        "organization.document @@ plainto_tsquery(:query)",
                        {
                            query: organizationInput.document
                        }
                    );
                } else {
                    query.where(
                        "organization.document @@ plainto_tsquery(:query)",
                        {
                            query: organizationInput.document
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
