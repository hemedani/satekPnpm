import { Arg, Args, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { Unit } from "../../entity/Site";
import { UserRole } from "../../entity/UserToSite";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyArgs } from "../../types/MyArgs";
import { AdminMiddlewares } from "../../utils/CommonMiddlewareList";
import { getAllResolverName } from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { UnitInput } from "./domains/UnitInput";
import { updateAllowedWareGroupsInput } from "./domains/updateAllowedWareGroupsInput";
import { suffix } from "./InheritedUnit.resolver";

@Resolver(() => Unit)
export class UnitResovler {
    @Mutation(() => Unit)
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async updateAllowedWareGroupsForUnit(
        @Arg("unitId") unitId: string,
        @Arg("data") updateAllowedWareGroups: updateAllowedWareGroupsInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }

        const unit = await Unit.findOne(unitId);
        if (!unit) {
            throw new NotFoundError();
        }

        const userToSites = user.userToSites!.filter(
            userToSite =>
                (userToSite.siteId === unit.organizationId && userToSite.role === UserRole.Admin) ||
                userToSite.role === UserRole.Master
        );
        if (userToSites.length < 1) {
            throw new AuthorizationError();
        }

        try {
            await Unit.update(unitId, {
                allowedWareGroupsIds: updateAllowedWareGroups.allowedWareGroupsIds
            });
        } catch {
            throw new BadUpdateError();
        }

        return Unit.findOne(unitId);
    }

    @Query(() => [Unit], { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async getUnits(
        @Arg("data", { nullable: true }) unitInput: UnitInput,
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput
    ) {
        const query = getRepository(Unit).createQueryBuilder("unit");

        if (unitInput) {
            if (unitInput.organizationId) {
                query.andWhere("unit.organizationId = :organizationId", {
                    organizationId: unitInput.organizationId
                });
            }

            if (unitInput.categoryId) {
                query.andWhere("unit.categoryId = :categoryId", {
                    categoryId: unitInput.categoryId
                });
            }

            if (unitInput.document) {
                query.andWhere("unit.document @@ plainto_tsquery(:query)", {
                    query: unitInput.document
                });
            }
        }

        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return await query.getMany();
    }
}
