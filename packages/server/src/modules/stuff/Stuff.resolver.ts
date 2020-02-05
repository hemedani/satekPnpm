import { Arg, Args, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { StoreStatus } from "../../entity/Site";
import { Stuff } from "../../entity/Stuff";
import { UserRole } from "../../entity/UserToSite";
import { Ware } from "../../entity/Ware";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadCreateError } from "../../errors/BadCreateError";
import { BadRequestError } from "../../errors/BadRequest";
import { NotFoundError } from "../../errors/NotFoundError";
import { ServerError } from "../../errors/ServerError";
import { MyArgs } from "../../types/MyArgs";
import { checkAuthorization, hasRole } from "../../utils/authorizationHelper";
import { NormalUserMiddlewares, StoreHeadMiddlewares } from "../../utils/CommonMiddlewareList";
import { createResolverName, getAllResolverName } from "../../utils/nameOfResolvers";
import { addOrderBy } from "../../utils/queryHelpers";
import { priceWithPercent } from "../../utils/redis/mathHelpers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { StuffsResponse } from "./boards/StuffsResponse";
import { CreateStuffInput } from "./domains/CreateStuffInput";
import { StuffInput, StuffSort } from "./domains/StuffInput";
import { suffix } from "./InheritedStuff.resolver";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { User } from "../../entity/User";

@Resolver(() => Stuff)
export class StuffResolver {
    @UseMiddleware(...defaultMiddleWares(), ...StoreHeadMiddlewares)
    @Mutation(() => Stuff, { name: createResolverName(suffix) })
    async createStuff(@Arg("data") createStuffInput: CreateStuffInput, @Args() { user }: MyArgs) {
        //user needs validation too?
        if (!user) {
            throw new AuthorizationError();
        }

        const userToSites = user.userToSites!.filter(
            userToSite =>
                userToSite.role === UserRole.StoreHead &&
                userToSite.siteId === createStuffInput.storeId
        );
        if (userToSites.length < 1) {
            throw new AuthorizationError();
        }

        const ware = await Ware.findOne(createStuffInput.wareId).catch(() => {
            throw new ServerError();
        });

        if (!ware) {
            throw new NotFoundError("کالا مورد نظر پیدا نشد.");
        }

        let stuffNewPrice = 0;
        if (createStuffInput.hasAbsolutePrice && createStuffInput.price) {
            stuffNewPrice = createStuffInput.price;
        } else if (!createStuffInput.hasAbsolutePrice && createStuffInput.pricePercentage) {
            stuffNewPrice = priceWithPercent(ware.price, createStuffInput.pricePercentage);
        } else {
            throw new BadRequestError("فیلد های قیمت و درصد را به درستی پر کنید.");
        }

        // I already know below code is a piece of shit(realy bad shit)
        // But all of them, was written by direct command of Syd
        {
            const months = [
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
                "nine",
                "ten",
                "eleven",
                "twelve",
                "eighteen",
                "twentyFour"
            ];

            const percentPostfix = "MonthPricePercent";
            const pricePostfix = "MonthPrice";

            let percentString: string;
            let priceString: string;
            for (const month of months) {
                percentString = `${month}${percentPostfix}`;

                if ((createStuffInput as any)[percentString]) {
                    priceString = `${month}${pricePostfix}`;

                    (createStuffInput as any)[priceString] = priceWithPercent(
                        stuffNewPrice,
                        (createStuffInput as any)[percentString]
                    );
                }
            }
        }
        if (!createStuffInput.barcode) {
            createStuffInput.isBarcodeSet = true;
        }
        return await Stuff.create({
            ...createStuffInput,
            wareTypeId: ware.wareTypeId,
            wareClassId: ware.wareClassId,
            wareGroupId: ware.wareGroupId,
            wareModelId: ware.wareModelId,
            price: stuffNewPrice
        })
            .save()
            .catch(() => {
                throw new BadCreateError();
            });
    }

    @Query(() => StuffsResponse, { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getStuffs(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true }) stuffInput: StuffInput,
        @Arg("sort", () => StuffSort, { defaultValue: StuffSort.Price })
        stuffSort: StuffSort,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthenticationError();
        }

        const query = getRepository(Stuff)
            .createQueryBuilder("stuff")
            .innerJoin("stuff.ware", "ware")
            .innerJoin("stuff.store", "store");

        if (
            stuffInput &&
            stuffInput.storeId &&
            checkAuthorization(user, UserRole.StoreHead, stuffInput.storeId)
        ) {
            // User is StoreHead
            query.andWhere("stuff.storeId = :storeId", {
                storeId: stuffInput.storeId
            });

            if (stuffInput.wareTypeId) {
                query.andWhere("ware.wareTypeId = :wareTypeId", {
                    wareTypeId: stuffInput.wareTypeId
                });
            }

            if (stuffInput.wareGroupIds) {
                query.andWhere("ware.wareGroupId IN (:...wareGroupIds)", {
                    wareGroupIds: stuffInput.wareGroupIds
                });
            }

            if (stuffInput.wareClassIds) {
                query.andWhere("ware.wareClassId IN (:...wareClassIds)", {
                    wareClassIds: stuffInput.wareClassIds
                });
            }

            if (stuffInput.wareModelId) {
                query.andWhere("ware.wareModelId = :wareModelId", {
                    wareModelId: stuffInput.wareModelId
                });
            }

            if (stuffInput.manufacturerId) {
                query.andWhere("ware.manufacturerId = :manufacturerId", {
                    manufacturerId: stuffInput.manufacturerId
                });
            }

            if (stuffInput.wareDocument) {
                query.andWhere("ware.document @@ plainto_tsquery(:query)", {
                    query: stuffInput.wareDocument
                });
            }

            if (stuffSort === StuffSort.createdAt) {
                addOrderBy(query, "stuff.createdAt", "DESC");
            } else if (stuffSort === StuffSort.Price) {
                addOrderBy(query, "stuff.price", "ASC");
            } else if (stuffSort === StuffSort.inventoryNo) {
                addOrderBy(query, "stuff.inventoryNo", "ASC");
            }
        } else {
            // User is not StoreHead
            // User could be UnitHead or OrganizationHead

            if (hasRole(user, UserRole.UnitHead) || hasRole(user, UserRole.OrganizationHead)) {
                query.andWhere("store.status = :status", {
                    status: StoreStatus.Confirmed
                });
                if (stuffInput) {
                    if (stuffInput.wareId) {
                        query.andWhere("stuff.wareId = :wareId", {
                            wareId: stuffInput.wareId
                        });
                    } else if (stuffInput.wareModelId) {
                        query.andWhere("stuff.wareModelId = :wareModelId", {
                            wareModelId: stuffInput.wareModelId
                        });
                    } else if (stuffInput.wareGroupIds) {
                        query.andWhere("stuff.wareGroupId IN (:...wareGroupIds)", {
                            wareGroupIds: stuffInput.wareGroupIds
                        });
                    } else if (stuffInput.wareClassIds) {
                        query.andWhere("stuff.wareClassId IN (:...wareClassIds)", {
                            wareClassIds: stuffInput.wareClassIds
                        });
                    } else if (stuffInput.wareTypeId) {
                        query.andWhere("stuff.wareTypeId = :wareTypeId", {
                            wareTypeId: stuffInput.wareTypeId
                        });
                    }

                    if (stuffInput.expiration) {
                        query.andWhere("stuff.expiration < :expiration", {
                            expiration: stuffInput.expiration
                        });
                    }

                    if (stuffInput.getNotExpired) {
                        query.andWhere("stuff.expiration >= :expiration", {
                            expiration: new Date()
                        });
                    }

                    if (stuffInput.inventoryNo) {
                        query.andWhere("stuff.inventoryNo >= :inventoryNo", {
                            inventoryNo: stuffInput.inventoryNo
                        });
                    }

                    if (stuffInput.longPayment) {
                        query.andWhere(
                            `'${stuffInput.longPayment}' = ANY(stuff.availableLongPayment)`
                        );
                    }

                    if (stuffInput.storeHeadId) {
                        const user = await getRepository(User)
                            .createQueryBuilder("user")
                            .innerJoinAndSelect(
                                "user.userToSites",
                                "userToSite",
                                "user.id = :userId",
                                {
                                    userId: stuffInput.storeHeadId
                                }
                            )
                            .getOne();
                        const stores = user?.userToSites?.map(userToSite => userToSite.siteId);
                        query.andWhere("stuff.storeId IN (:...stores)", {
                            stores
                        });
                    }
                    // TODO: sort base on new longPayment price
                    // addOrderBy(query, "", "ASC");
                }
            } else {
                throw new AuthorizationError();
            }
        }
        addOrderBy(query, "stuff.price", "ASC");
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);

        let result, count;
        try {
            if (stuffInput && stuffInput.getTotal) {
                [result, count] = await query.getManyAndCount();
            } else {
                result = await query.getMany();
            }
        } catch (err) {
            throw new BadRequestError(err);
        }

        return { items: result, total: count };
    }

    @Mutation(() => Stuff)
    @UseMiddleware(...defaultMiddleWares(), ...StoreHeadMiddlewares)
    async updateStuff(@Arg("data") updateStuffInput: CreateStuffInput, @Arg("id") id: string) {
        const createdStuff = await Stuff.findOne(id);
        if (!createdStuff) {
            throw new NotFoundError(" کالا ");
        }
        const stuffId = createdStuff.id;
        if (createdStuff.isBarcodeSet) {
            updateStuffInput.barcode = createdStuff.barcode;
            updateStuffInput.isBarcodeSet = true;
        }
        try {
            return await Stuff.update(stuffId, updateStuffInput);
        } catch {
            throw new BadUpdateError();
        }
    }
}
