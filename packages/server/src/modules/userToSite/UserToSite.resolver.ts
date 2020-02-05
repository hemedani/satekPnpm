import { Arg, Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Unit } from "../../entity/Site";
import { UserRole, UserToSite } from "../../entity/UserToSite";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadCreateError } from "../../errors/BadCreateError";
import { BadRequestError } from "../../errors/BadRequest";
import { DeprecatedError } from "../../errors/deprecatedError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyArgs } from "../../types/MyArgs";
import { AdminMiddlewares } from "../../utils/CommonMiddlewareList";
import { createResolverName } from "../../utils/nameOfResolvers";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { CreateUserToSiteInput } from "./domains/CreateUserToSiteInput";
import { suffix } from "./InheritedUserToSite.resolver";

@Resolver()
export class UserToSiteResolver {
    @Mutation(() => UserToSite, { name: createResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async create(
        @Arg("data") input: CreateUserToSiteInput,
        @Args() { user }: MyArgs
    ) {
        // bug: a person just could be Head for one departnement

        let currentUserRole: UserRole | undefined = undefined;
        let currentSiteId: string | undefined = undefined;

        const userRoleOrders = [
            UserRole.Master,
            UserRole.Admin,
            UserRole.OrganizationHead,
            UserRole.UnitHead
        ];
        for (let userRoleOrder of userRoleOrders) {
            const userToSite = user!.userToSites!.filter(
                userToSite => userToSite.role === userRoleOrder
            );
            if (userToSite.length >= 1) {
                currentUserRole = userRoleOrder;
                // above bug cause
                currentSiteId = userToSite[0].siteId;
                break;
            }
        }

        if (!currentUserRole) {
            throw new AuthorizationError();
        }

        if (
            currentUserRole === UserRole.Master &&
            input.role === UserRole.Master
        ) {
            try {
                return await UserToSite.create(input).save();
            } catch {
                throw new BadCreateError();
            }
        }

        // Just for master SiteId could be null
        if (!input.siteId) {
            throw new BadRequestError("سایت آیدی نمی تواند خالی باشد.");
        }

        if (currentUserRole === UserRole.Master) {
            try {
                return await UserToSite.create(input).save();
            } catch {
                throw new BadCreateError();
            }
        } else if (currentUserRole === UserRole.Admin) {
            const currentAdminSiteId = currentSiteId;
            if (!currentAdminSiteId) {
                throw new AuthorizationError();
            }
            if (
                input.role !== UserRole.UnitHead &&
                input.role !== UserRole.UnitEmployee
            ) {
                if (input.siteId === currentAdminSiteId) {
                    try {
                        return await UserToSite.create(input).save();
                    } catch {
                        throw new BadCreateError();
                    }
                }
            } else {
                const unit = await Unit.findOne(input.siteId);
                if (!unit) {
                    throw new NotFoundError();
                }

                if (unit.organizationId === currentAdminSiteId) {
                    try {
                        return await UserToSite.create(input).save();
                    } catch {
                        throw new BadCreateError();
                    }
                }
            }
        }

        throw new AuthorizationError();
    }

    // createMater create a master just when UserToSite table was empty.
    @Mutation(() => UserToSite)
    async createMaster(@Arg("id") id: string) {
        const result = await UserToSite.findOne({});
        if (result) {
            throw new DeprecatedError();
        }

        return UserToSite.create({ userId: id, role: UserRole.Master }).save();
    }
}
