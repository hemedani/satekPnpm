import {
    Arg,
    Args,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
    FieldResolver,
    Root
} from "type-graphql";
import { getRepository } from "typeorm";
import { Unit } from "../../entity/Site";
import { User } from "../../entity/User";
import { UserRole } from "../../entity/UserToSite";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadRequestError } from "../../errors/BadRequest";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { MyArgs } from "../../types/MyArgs";
import { MyContext } from "../../types/MyContext";
import { AdminMiddlewares, NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { hashPassword } from "../../utils/hash";
import { getAllResolverName, updateResolverName } from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { UsersResponse } from "./boards/UsersResponse";
import { UpdateAllowedWaresInput } from "./domains/UpdateAllowedWaresInput";
import { UpdateUserInput } from "./domains/UpdateUserInput";
import { UserInput } from "./domains/UserInput";
import { suffix } from "./InheritedUser.resolver";
import { UpdateUserData } from "./domains/UpdateUserData";
import { refinePhone } from "../../utils/refinePhone";
import { Ware } from "../../entity/Ware";

@Resolver(() => User)
export class UserResolver {
    @Mutation(() => User, { name: updateResolverName("User") })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async updateUser(@Arg("data") updateUserInput: UpdateUserInput, @Ctx() { userId }: MyContext) {
        if (updateUserInput.password) {
            updateUserInput.password = await hashPassword(updateUserInput.password);
        }
        await User.update(userId!, updateUserInput).catch(() => {
            throw new BadUpdateError();
        });

        return User.findOne(userId);
    }

    @Mutation(() => User)
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async updateAllowedWaresForUser(
        @Arg("userId") userId: string,
        @Arg("data") updateAllowedWaresInput: UpdateAllowedWaresInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }

        try {
            await User.update(userId, {
                allowedWaresIds: updateAllowedWaresInput.allowedWaresIds
            });
        } catch {
            throw new BadUpdateError();
        }

        return User.findOne(userId);
    }

    @Mutation(() => User)
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async updateUserData(
        @Arg("userId") userId: string,
        @Arg("data") updateUserData: UpdateUserData,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }

        let { photoUrl, firstName, lastName, ssn, phoneNumber, password } = updateUserData;
        phoneNumber = refinePhone(phoneNumber);
        const phone = Number(phoneNumber);
        try {
            await User.update(userId, {
                photoUrl,
                firstName,
                lastName,
                ssn,
                phone,
                password,
                devices: []
            });
        } catch {
            throw new BadUpdateError();
        }

        return User.findOne(userId);
    }

    @Query(() => UsersResponse, {
        name: getAllResolverName(suffix)
    })
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async getUsers(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true }) userInput: UserInput,
        @Args() { user }: MyArgs
    ) {
        const query = getRepository(User)
            .createQueryBuilder("user")
            .innerJoin("user.userToSites", "userToSites");

        let userToSites = user!.userToSites!.filter(
            userToSite => userToSite.role === UserRole.Master
        );

        if (userToSites.length >= 1) {
            // User is master
        } else if (userInput && userInput.organizationId) {
            userToSites = user!.userToSites!.filter(
                userToSite =>
                    userToSite.role === UserRole.Admin &&
                    userToSite.siteId === userInput.organizationId
            );

            if (userToSites.length >= 1) {
                // User is admin
            } else {
                throw new AuthorizationError();
            }
        } else {
            throw new BadRequestError("آیدی سازمان برای شما اجباری است.");
        }

        if (userInput && (userInput.organizationId || userInput.unitId)) {
            // allowedSiteIds for organizationHead and unit Head

            let allowedSiteIds: string[] = [];

            if (userInput.organizationId) {
                // We just have organizationId ... so we must add UnitId too

                let units: Unit[];
                if (userInput.unitId) {
                    units = await Unit.find({
                        where: {
                            organizationId: userInput.organizationId,
                            id: userInput.unitId
                        }
                    });
                } else {
                    allowedSiteIds = [userInput.organizationId];
                    units = await Unit.find({
                        where: { organizationId: userInput.organizationId }
                    });
                }

                const unitIds = units.map(unit => unit.id);
                allowedSiteIds.push(...unitIds);
            }

            query.andWhere("userToSites.siteId IN (:...siteIds)", {
                siteIds: allowedSiteIds
            });

            if (userInput.role) {
                query.andWhere("userToSites.role = :role", {
                    role: userInput.role
                });
            }

            if (userInput.document) {
                query.andWhere("user.document @@ plainto_tsquery(:query)", {
                    query: userInput.document
                });
            }
        }
        userInput;

        // Pagination stuffs
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);

        let result, count;
        try {
            [result, count] = await query.getManyAndCount();
        } catch (err) {
            throw new BadRequestError(err);
        }

        return { items: result, total: count };
    }

    //every one sees his own chats
    // @FieldResolver(() => [Chat])
    // @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    // async chats(@Args() { user }: MyArgs): Promise<Chat[]> {
    //     return await getRepository(Chat)
    //         .createQueryBuilder("chat")
    //         .innerJoin("chat.contacts", "user")
    //         .where("user.id = :id", { id: user!.id })
    //         .getMany();
    // }

    @FieldResolver(() => [Ware], { nullable: true })
    async allowedWares(@Root() user: User) {
        let wares;
        if (user.allowedWaresIds) wares = await Ware.findByIds(user.allowedWaresIds);
        return wares;
    }
}
