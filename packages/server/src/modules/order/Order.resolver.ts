import {
    Arg,
    Args,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
    FieldResolver,
    Int,
    Root
} from "type-graphql";
import { getRepository, getConnection } from "typeorm";
import {
    Order,
    OrderStatus,
    CommentByFinanceStatus,
    CommentByExpertStatus,
    CheckByFinance,
    CheckByExpert,
    CheckByStockclerkStatus,
    CheckBySupplierStatus,
    ChosenPayment,
    storeHeadStatuses
} from "../../entity/Order";
import { Unit, Store } from "../../entity/Site";
import { Stuff } from "../../entity/Stuff";
import { UserRole } from "../../entity/UserToSite";
import { Ware } from "../../entity/Ware";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadCreateError } from "../../errors/BadCreateError";
import { BadOrderStatusError } from "../../errors/BadOrderStatusError";
import { BadRequestError } from "../../errors/BadRequest";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MyArgs } from "../../types/MyArgs";
import { checkAuthorization, isAuthorize, hasRole } from "../../utils/authorizationHelper";
import { NormalUserMiddlewares, UnitUserMiddlewares } from "../../utils/CommonMiddlewareList";
import {
    createResolverName,
    getAllResolverName,
    updateResolverName,
    getResolverName
} from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { OrdersResponse } from "./boards/OrdersResponse";
import { CreateOrderInput } from "./domains/CreateOrderInput";
import {
    OrderInput,
    CommentByExpertStatusInput,
    CommentByFinanceStatusInput,
    CheckByStockclerkStatusInput,
    CheckBySupplierStatusInput,
    OrderSort
    // OrderSort
} from "./domains/OrderInput";
import { UpdateOrderInput } from "./domains/UpdateOrderInput";
import { UpdateStatusOrderInput } from "./domains/UpdateOrderStatusInput";
import { UpdateOrderStuffInput } from "./domains/UpdateOrderStuffInput";
import { suffix } from "./InheritedOrder.resolver";
import { updateStoreStatistics } from "../store/Store.resolver";
import { GetSingleOrderInput } from "./domains/GetSingleOrderInput";
import { User } from "../../entity/User";
import { addOrderBy } from "../../utils/queryHelpers";
import {
    // getPreviousOrderInput,
    createOrdetInputValidation,
    updateOrderStatusInputValidation,
    UpdateOrderInputValidation,
    paginationInputValidation,
    // getOrdersInputValidation,
    getOrderInputValidation,
    getNextOrderInputValidation
} from "@satek/validations";
import {
    updateOrgStatistics,
    updateOrderStatistics
} from "../OrderStatatistics/OrderStatistic.resolver";
@Resolver(() => Order)
export class OrderResovler {
    @Mutation(() => Order, { name: createResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...UnitUserMiddlewares)
    async createOrder(@Arg("data") createOrderInput: CreateOrderInput, @Args() { user }: MyArgs) {
        if (!user) {
            throw new AuthenticationError();
        }
        try {
            await createOrdetInputValidation.validate(createOrderInput);
            const userToSites = user.userToSites!.filter(
                userTosite =>
                    userTosite.siteId === createOrderInput.unitId &&
                    (userTosite.role === UserRole.UnitHead ||
                        userTosite.role === UserRole.UnitEmployee)
            );

            if (userToSites.length < 1) {
                // Order has unitId so it's for a unit
                // user must have a role with that unitId
                // if doesn't have i throw an Error
                throw new AuthorizationError();
            } else {
                // User has atleast one role with appropriate unitId
                const ware = await Ware.findOne(createOrderInput.wareId);
                if (!ware) {
                    throw new NotFoundError("کالای مورد نظر پیدا نشد.");
                }
                const stuff = await Stuff.findOne(createOrderInput.stuffId);
                if (!stuff) {
                    throw new NotFoundError("محصول مورد نظر پیدا نشد.");
                }
                if (!createOrderInput.deliveryTime && createOrderInput.fastDeliveryTime) {
                    let date = new Date();
                    date.setHours(date.getHours() + createOrderInput.fastDeliveryTime);
                    createOrderInput.deliveryTime = date;
                } else if (!createOrderInput.deliveryTime) {
                    throw new BadCreateError(
                        "در صورتی که تحویل فوری نباشد زمان تحویل کالا باید مشخص شود"
                    );
                }

                const order = await Order.create({
                    ...createOrderInput,
                    status: OrderStatus.pendingInUnitHead,
                    wareTypeId: stuff.wareTypeId,
                    wareClassId: stuff.wareClassId,
                    wareGroupId: stuff.wareGroupId,
                    wareModelId: stuff.wareModelId
                }).save();
                updateOrderStatistics(order.unitId, "pendingInUnitHeadNumber");
                return order;
            }
        } catch (err) {
            throw new BadCreateError(err);
        }
    }

    @Mutation(() => Order)
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async updateOrderStatus(
        @Arg("id") id: string,
        @Arg("data") updateOrderStatusInput: UpdateStatusOrderInput,
        @Args() { user }: MyArgs
    ) {
        try {
            await updateOrderStatusInputValidation.validate(updateOrderStatusInput);

            const order = await Order.findOne(id);
            if (!user) {
                throw new AuthorizationError();
            }

            if (!order) {
                throw new NotFoundError();
            }
            if (
                hasRole(user, UserRole.Expert) && //returns boolean, chance for other users to proceed
                checkAuthorization(user, UserRole.Expert, order.organizationId)
            ) {
                // Expert
                if (
                    updateOrderStatusInput.checkByExpert ===
                        (CheckByExpert.Valid || CheckByExpert.Invalid) &&
                    order.commentByExpertStatus ===
                        (CommentByExpertStatus.sentNoResponse || CommentByExpertStatus.responded)
                ) {
                    await Order.update(id, {
                        commentByExpert: updateOrderStatusInput.comment,
                        commentByExpertStatus: updateOrderStatusInput.commentByExpertStatus,
                        checkByExpert: updateOrderStatusInput.checkByExpert
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                hasRole(user, UserRole.FinanceHead) && //returns boolean, chance for other users to proceed
                checkAuthorization(user, UserRole.FinanceHead, order.organizationId)
            ) {
                //Finance Head
                if (
                    order.commentByFinanceStatus ===
                        (CommentByFinanceStatus.sentNoResponse ||
                            CommentByFinanceStatus.responded) &&
                    updateOrderStatusInput.checkByFinance ===
                        (CheckByFinance.Invalid || CheckByFinance.Valid)
                ) {
                    await Order.update(id, {
                        commentByFinance: updateOrderStatusInput.comment,
                        commentByFinanceStatus: updateOrderStatusInput.commentByFinanceStatus,
                        checkByFinance: updateOrderStatusInput.checkByFinance
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                hasRole(user, UserRole.Supplier) && //returns boolean, chance for other users to proceed
                checkAuthorization(user, UserRole.Supplier, order.organizationId)
            ) {
                //Supplier
                if (updateOrderStatusInput.checkBySupplier) {
                    await Order.update(id, {
                        checkBySupplier: updateOrderStatusInput.checkBySupplier,
                        checkBySupplierStatus: CheckBySupplierStatus.responded
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                hasRole(user, UserRole.Stockclerk) && //returns boolean, chance for other users to proceed
                checkAuthorization(user, UserRole.Stockclerk, order.organizationId)
            ) {
                //Stockclrek
                if (
                    updateOrderStatusInput.checkByStockclerk ||
                    updateOrderStatusInput.stockRemaining
                ) {
                    await Order.update(id, {
                        checkByStockclerk: updateOrderStatusInput.checkByStockclerk
                            ? updateOrderStatusInput.checkByStockclerk
                            : order.checkByStockclerk,
                        stockRemaining: updateOrderStatusInput.stockRemaining
                            ? updateOrderStatusInput.stockRemaining
                            : order.stockRemaining,
                        checkByStockclerkStatus: CheckByStockclerkStatus.responded
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                order.status === OrderStatus.pendingInOrganizationHead &&
                checkAuthorization(user, UserRole.OrganizationHead, order.organizationId)
            ) {
                //Organization Head
                if (updateOrderStatusInput.orderStatus === OrderStatus.rejectedByOrganizationHead) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus,
                        rejectedByUserId: user.id,
                        commentForRejection: updateOrderStatusInput.comment
                    });
                } else if (
                    updateOrderStatusInput.commentByExpertStatus ===
                    CommentByExpertStatus.sentNoResponse
                ) {
                    await Order.update(id, {
                        commentByExpertStatus: updateOrderStatusInput.commentByExpertStatus
                    });
                } else if (
                    updateOrderStatusInput.commentByFinanceStatus ===
                    CommentByFinanceStatus.sentNoResponse
                ) {
                    await Order.update(id, {
                        commentByFinanceStatus: updateOrderStatusInput.commentByFinanceStatus
                    });
                } else if (
                    updateOrderStatusInput.orderStatus === OrderStatus.pendingInStore &&
                    order.stuffId // stuff should be recognized
                ) {
                    // DO SOME fancy stuff to decrease inventory nubmer of real stuff
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                order.status === OrderStatus.pendingInUnitHead &&
                checkAuthorization(user, UserRole.UnitHead, order.unitId)
            ) {
                //Unit head
                if (updateOrderStatusInput.orderStatus === OrderStatus.rejectedByUnitHead) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus,
                        rejectedByUserId: user.id,
                        commentForRejection: updateOrderStatusInput.comment
                    });
                    updateOrderStatistics(order.unitId, "rejectedByUnitHeadNumber");
                    //counter
                } else if (
                    updateOrderStatusInput.orderStatus === OrderStatus.pendingInOrganizationHead &&
                    order.stuffId // stuff should be recognized
                ) {
                    console.log(order);
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus,
                        checkByStockclerkStatus: CheckByStockclerkStatus.NoResponse,
                        checkBySupplierStatus: CheckBySupplierStatus.NoResponse
                    });
                    console.log(order);
                    // unitHeadToOrgHeadStatics(order);
                    updateOrderStatistics(order.unitId, "acceptedByUnitHead");
                    updateOrgStatistics(order.organizationId, "pendingInOrgHeadNumber");
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                (order.status === OrderStatus.pendingInStore ||
                    order.status === OrderStatus.PreparationByStore) &&
                order.storeId &&
                checkAuthorization(user, UserRole.StoreHead, order.storeId)
            ) {
                updateOrgStatistics(order.organizationId, "acceptedByOrgHeadNumber");
                //store Head
                if (updateOrderStatusInput.orderStatus === OrderStatus.rejectedByStore) {
                    // Add store UserId or not?
                    await Order.update(id, {
                        rejectedByUserId: user.id,
                        commentForRejection: updateOrderStatusInput.comment,
                        status: updateOrderStatusInput.orderStatus
                    });
                } else if (updateOrderStatusInput.orderStatus === OrderStatus.PreparationByStore) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus
                    });
                } else if (updateOrderStatusInput.orderStatus === OrderStatus.sentByStore) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus
                    });
                    //store statistics
                    await updateStoreStatistics(order);
                }
            } else if (
                order.status === OrderStatus.sentByStore &&
                checkAuthorization(user, UserRole.UnitEmployee, order.unitId)
            ) {
                // Accept order in another api

                if (updateOrderStatusInput.orderStatus === OrderStatus.rejectedByEmployee) {
                    await Order.update(id, {
                        rejectedByUserId: user.id,
                        status: updateOrderStatusInput.orderStatus,
                        commentForRejection: updateOrderStatusInput.comment
                    });
                } else if (updateOrderStatusInput.orderStatus === OrderStatus.pendingForPay) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else if (
                order.status === OrderStatus.pendingForPay &&
                checkAuthorization(user, UserRole.OrganizationHead, order.organizationId)
            ) {
                if (updateOrderStatusInput.orderStatus === OrderStatus.Paid) {
                    await Order.update(id, {
                        status: updateOrderStatusInput.orderStatus
                    });
                    if (order.storeId && order.totalPrice && order.num) {
                        await Store.update(order.storeId, {
                            totalNotPaid: () => `"totalNotPaid" - ${order.totalPrice}`,
                            totalPaid: () => `"totalPaid" + ${order.totalPrice}`
                        });
                    } else {
                        throw new BadUpdateError("اطلاعات سفارش کامل نیست");
                    }
                } else if (updateOrderStatusInput.orderStatus === OrderStatus.rejectedForPay) {
                    await Order.update(id, {
                        rejectedByUserId: user.id,
                        status: updateOrderStatusInput.orderStatus
                    });
                } else {
                    throw new BadOrderStatusError();
                }
            } else {
                throw new BadOrderStatusError();
            }
        } catch (error) {
            throw error.message;
        }

        return await Order.findOne(id);
    }

    @Mutation(() => Order, { name: updateResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async updateOrder(
        @Arg("id") orderId: string,
        @Arg("data") updateOrderInput: UpdateOrderInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }
        try {
            await UpdateOrderInputValidation.validate(updateOrderInput);

            const order = await Order.findOne(orderId);
            if (!order) {
                throw new NotFoundError();
            }

            if (
                (order.status === OrderStatus.pendingInUnitHead &&
                    isAuthorize(user, UserRole.UnitHead, order.unitId)) ||
                (order.status === OrderStatus.pendingInOrganizationHead &&
                    isAuthorize(user, UserRole.OrganizationHead, order.organizationId))
            ) {
                await Order.update(orderId, updateOrderInput).catch(() => {
                    throw new BadUpdateError();
                });
            } else {
                throw new BadRequestError("شما قادر به تغییر این سفارش نیستید.");
            }
        } catch (e) {
            throw e.message;
        }

        return Order.findOne(orderId);
    }

    @Mutation(() => Order)
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async updateOrderStuff(
        @Arg("orderId") orderId: string,
        @Arg("data") updateOrderStuffInput: UpdateOrderStuffInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthorizationError();
        }
        try {
            // await updateOrderStatusInputValidation.validate(updateOrderStuffInput);

            const order = await Order.findOne(orderId);
            if (!order) {
                throw new NotFoundError();
            }

            if (
                (order.status === OrderStatus.pendingInUnitHead &&
                    checkAuthorization(user, UserRole.UnitHead, order.unitId)) ||
                (order.status === OrderStatus.pendingInOrganizationHead &&
                    checkAuthorization(user, UserRole.OrganizationHead, order.organizationId))
            ) {
                const stuff = await Stuff.findOne(updateOrderStuffInput.stuffId);
                if (!stuff) {
                    throw new NotFoundError("جنس انتخابی شما پیدا نشد.");
                }

                // TODO :: Caution
                // We must lock resource in some way
                // But we don't ;)

                //check new or previous order num
                if (
                    (updateOrderStuffInput &&
                        updateOrderStuffInput.num &&
                        stuff.inventoryNo < updateOrderStuffInput.num) ||
                    (!updateOrderStuffInput.num && stuff.inventoryNo < order.num)
                ) {
                    throw new BadRequestError(
                        "تعداد سفارش شما از تعداد موجود جنس فروشنده بیشتر است."
                    );
                }

                if (
                    updateOrderStuffInput.status &&
                    updateOrderStuffInput.status !== OrderStatus.pendingInOrganizationHead
                ) {
                    throw new BadRequestError(
                        "در این مرحله وضعیت سفارش نمیتواند به وضعیت درخواست شده تغییر کند."
                    );
                }
                if (
                    updateOrderStuffInput.chosenPayment === ChosenPayment.Incash &&
                    updateOrderStuffInput.longPayment
                ) {
                    throw new BadRequestError(
                        "درصورت انتخاب پرداخت نقدی،بازه زمانی پرداخت بلند مدت نباید مقدار داشته باشد "
                    );
                }
                if (
                    updateOrderStuffInput.chosenPayment === ChosenPayment.LongPayment &&
                    !updateOrderStuffInput.longPayment
                ) {
                    throw new BadRequestError(
                        "درصورت انتخاب پرداخت بلندمدت،بازه زمانی پرداخت بلند مدت باید مقدار داشته باشد "
                    );
                }

                if (!order.num && !updateOrderStuffInput.num) {
                    throw new BadRequestError("تعداد موردنیاز را باید وارد کنید");
                }
                await Order.update(orderId, {
                    ...updateOrderStuffInput,
                    storeId: stuff.storeId,
                    wareTypeId: stuff.wareTypeId,
                    wareClassId: stuff.wareClassId,
                    wareGroupId: stuff.wareGroupId,
                    wareModelId: stuff.wareModelId
                });
            }
        } catch (err) {
            throw new BadUpdateError(err);
        }
        return await Order.findOne(orderId);
    }

    @Query(() => OrdersResponse, { name: getAllResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getOrders(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true }) orderInput: OrderInput,
        @Arg("sort", () => OrderSort, { defaultValue: OrderSort.CreatedAt_Desc })
        orderSort: OrderSort,
        @Args() { user }: MyArgs
    ) {
        const query = getRepository(Order)
            .createQueryBuilder("order")
            .innerJoin("order.ware", "ware");

        let userToSites = user!.userToSites!.filter(
            userToSite => userToSite.role === UserRole.Master
        );
        try {
            await paginationInputValidation.validate(paginationInput);
            // await getOrdersInputValidation.validate(orderInput);

            if (userToSites.length >= 1) {
                // User is master
            } else if (orderInput && orderInput.storeId) {
                userToSites = user!.userToSites!.filter(
                    userToSite =>
                        userToSite.role === UserRole.StoreHead &&
                        userToSite.siteId === orderInput.storeId
                );

                if (userToSites.length >= 1) {
                    // User is StoreHead
                } else {
                    throw new AuthorizationError();
                }

                // StoreHead can search his/her specific OrderStatuses
                if (orderInput.statuses) {
                    orderInput.statuses = orderInput.statuses.filter(searchedStatus =>
                        storeHeadStatuses.map(allowedStatus => searchedStatus === allowedStatus)
                    );
                }
                query.andWhere("order.storeId = :storeId", {
                    storeId: orderInput.storeId
                });
            } else if (
                orderInput &&
                orderInput.organizationId &&
                orderInput.commentByExpertStatusInput
            ) {
                const userToSite = user!.userToSites!.filter(
                    userToSite => userToSite.role === UserRole.Expert
                );
                if (userToSite.length >= 1) {
                    //User is Expert
                } else {
                    throw new AuthenticationError();
                }
                if (
                    orderInput.commentByExpertStatusInput ===
                    CommentByExpertStatusInput.sentNoResponse
                ) {
                    query.andWhere("order.commentByExpertStatus = :status", {
                        status: CommentByExpertStatus.sentNoResponse
                    });
                } else if (
                    orderInput.commentByExpertStatusInput === CommentByExpertStatusInput.responded
                ) {
                    query.andWhere("order.commentByExpertStatus = :status", {
                        status: CommentByExpertStatus.responded
                    });
                } else if (
                    orderInput.commentByExpertStatusInput ===
                    CommentByExpertStatusInput.bothSentAndResponded
                ) {
                    query
                        .andWhere("order.commentByExpertStatus = :status", {
                            status: CommentByExpertStatus.sentNoResponse
                        })
                        .orWhere("order.commentByExpertStatus = :status", {
                            status: CommentByExpertStatus.responded
                        });
                } else {
                    throw new BadRequestError(
                        "کارشناس باید وضعیت نظرهای دلخواه را به درستی انتخاب کند."
                    );
                }
            } else if (
                orderInput &&
                orderInput.organizationId &&
                (orderInput.checkByStockclerk || orderInput.checkByStockclerkStatusInput)
            ) {
                const userToSite = user!.userToSites!.filter(
                    userToSite => userToSite.role === UserRole.Stockclerk
                );
                if (userToSite.length >= 1) {
                    //User is Stockclerk
                } else {
                    throw new AuthenticationError();
                }
                if (orderInput.checkByStockclerk) {
                    query.andWhere("order.checkByStockclerk = :status", {
                        status: orderInput.checkByStockclerk
                    });
                } else if (
                    orderInput.checkByStockclerkStatusInput ===
                    CheckByStockclerkStatusInput.NoResponse
                ) {
                    query.andWhere("order.checkByStockclerkStatus = :status", {
                        status: CheckByStockclerkStatus.NoResponse
                    });
                } else if (
                    orderInput.checkByStockclerkStatusInput ===
                    CheckByStockclerkStatusInput.responded
                ) {
                    query.andWhere("order.checkByStockclerkStatus = :status", {
                        status: CheckByStockclerkStatus.responded
                    });
                } else if (
                    orderInput.checkByStockclerkStatusInput ===
                    CheckByStockclerkStatusInput.bothRespondedAndNoResponse
                ) {
                    query
                        .andWhere("order.checkByStockclerkStatus= :status", {
                            status: CheckByStockclerkStatus.NoResponse
                        })
                        .orWhere("order.checkByStockclerkStatus= :status", {
                            status: CheckByStockclerkStatus.responded
                        });
                } else {
                    throw new BadRequestError(
                        "انباردار باید وضعیت نظرهای دلخواه را به درستی انتخاب کند."
                    );
                }
            } else if (
                orderInput &&
                orderInput.organizationId &&
                (orderInput.checkBySupplier || orderInput.checkBySupplierStatusInput)
            ) {
                const userToSite = user!.userToSites!.filter(
                    userToSite => userToSite.role === UserRole.Supplier
                );
                if (userToSite.length >= 1) {
                    //User is Supplier
                } else {
                    throw new AuthenticationError();
                }
                if (orderInput.checkBySupplier) {
                    query.andWhere("order.checkBySupplier = :status", {
                        status: orderInput.checkBySupplier
                    });
                } else if (
                    orderInput.checkBySupplierStatusInput === CheckBySupplierStatusInput.NoResponse
                ) {
                    query.andWhere("order.checkBySupplierStatus = :status", {
                        status: CheckBySupplierStatus.NoResponse
                    });
                } else if (
                    orderInput.checkBySupplierStatusInput === CheckBySupplierStatusInput.responded
                ) {
                    query.andWhere("order.checkBySupplierStatus = :status", {
                        status: CheckBySupplierStatus.responded
                    });
                } else if (
                    orderInput.checkBySupplierStatusInput ===
                    CheckBySupplierStatusInput.bothRespondedAndNoResponse
                ) {
                    query
                        .andWhere("order.checkBySupplierStatus = :status", {
                            status: CheckBySupplierStatus.NoResponse
                        })
                        .orWhere("order.checkBySupplierStatus = :status", {
                            status: CheckBySupplierStatus.responded
                        });
                } else {
                    throw new BadRequestError(
                        "کارپرداز باید وضعیت نظرهای دلخواه را به درستی انتخاب کند."
                    );
                }
            } else if (
                orderInput &&
                orderInput.organizationId &&
                orderInput.commentByFinanceStatusInput
            ) {
                const userToSite = user!.userToSites!.filter(
                    userToSite => userToSite.role === UserRole.FinanceHead
                );
                if (userToSite.length >= 1) {
                    //User is Finance
                } else {
                    throw new AuthenticationError();
                }
                if (
                    orderInput.commentByFinanceStatusInput ===
                    CommentByFinanceStatusInput.sentNoResponse
                ) {
                    query.andWhere("order.commentByFinanceStatus = :status", {
                        status: CommentByFinanceStatus.sentNoResponse
                    });
                } else if (
                    orderInput.commentByFinanceStatusInput === CommentByFinanceStatusInput.responded
                ) {
                    query.andWhere("order.commentByFinanceStatus = :status", {
                        status: CommentByFinanceStatus.responded
                    });
                } else if (
                    orderInput.commentByFinanceStatusInput ===
                    CommentByFinanceStatusInput.bothSentAndResponded
                ) {
                    query
                        .andWhere("order.commentByFinanceStatus = :status", {
                            status: CommentByFinanceStatus.sentNoResponse
                        })
                        .andWhere("order.commentByFinanceStatus = :status", {
                            status: CommentByFinanceStatus.responded
                        });
                } else {
                    throw new BadRequestError("کارشناس مالی باید وضعیت نظرهای خود را انتخاب کند.");
                }
            } else if (orderInput && orderInput.organizationId) {
                userToSites = user!.userToSites!.filter(
                    userToSite =>
                        (userToSite.role === UserRole.Admin ||
                            userToSite.role === UserRole.OrganizationHead) &&
                        userToSite.siteId === orderInput.organizationId
                );

                if (userToSites.length >= 1) {
                    // User is Admin, OrganizationHead
                } else {
                    throw new AuthorizationError();
                }
                if (orderInput.unitId) {
                    const unit = await Unit.findOne({
                        where: {
                            id: orderInput.unitId,
                            organizationId: orderInput.organizationId
                        }
                    });

                    if (!unit) {
                        throw new NotFoundError("واحد درخواستی در سازمان شما وجود ندارد.");
                    }
                }
            } else if (orderInput && orderInput.unitId) {
                userToSites = user!.userToSites!.filter(
                    userToSite =>
                        (userToSite.role === UserRole.UnitEmployee ||
                            userToSite.role === UserRole.UnitHead) &&
                        userToSite.siteId === orderInput.unitId
                );
                if (userToSites.length >= 1) {
                    // User is Unit head or employee
                } else {
                    throw new AuthorizationError();
                }
            } else {
                throw new BadRequestError(
                    "آیدی سازمان و یا آیدی واحد برای درخواست شما مورد نیاز است."
                );
            }

            if (orderInput) {
                if (orderInput.trackingcode && orderInput.wareDocument) {
                    throw new BadRequestError(
                        "هر دو فیلد اسم کالا و کد پیگیری نمیتوانند مقدار داشته باشند."
                    );
                }

                if (orderInput.organizationId) {
                    query.andWhere("order.organizationId = :organizationId", {
                        organizationId: orderInput.organizationId
                    });
                }
                if (orderInput.storeHeadId) {
                    const user = await getRepository(User)
                        .createQueryBuilder("user")
                        .innerJoinAndSelect("user.userToSites", "userToSite", "user.id = :userId", {
                            userId: orderInput.storeHeadId
                        })
                        .getOne();
                    if (user && user.userToSites) {
                        const stores = user.userToSites.map(userToSite => userToSite.siteId);
                        query.andWhere("stuff.storeId IN (:...stores)", {
                            stores
                        });
                    }
                }
                // if (orderInput) {
                // if (orderInput.trackingcode && orderInput.wareDocument) {
                // throw new BadRequestError(
                // "هر دو فیلد اسم کالا و کد پیگیری نمیتوانند مقدار داشته باشند."
                // );
                // }
                //
                // if (orderInput.organizationId) {
                // query.andWhere("order.organizationId = :organizationId", {
                // organizationId: orderInput.organizationId
                // });
                // }

                if (orderInput.unitId) {
                    query.andWhere("order.unitId = :unitId", {
                        unitId: orderInput.unitId
                    });
                }

                // if (orderInput.statuses) {
                //     query.andWhere("order.status = :status", {
                //         status: orderInput.statuses
                //     });
                // }

                if (orderInput.fastDelivery) {
                    query.andWhere("order.fastDelivery = :fastDelivery", {
                        fastDelivery: orderInput.fastDelivery
                    });
                }

                if (orderInput.irc) {
                    query.andWhere("ware.irc = :irc", {
                        irc: orderInput.irc
                    });
                }

                if (orderInput.wareTypeId) {
                    query.andWhere("ware.wareTypeId = :wareTypeId", {
                        wareTypeId: orderInput.wareTypeId
                    });
                }

                if (orderInput.wareClassId) {
                    query.andWhere("ware.wareClassId = :wareClassId", {
                        wareClassId: orderInput.wareClassId
                    });
                }

                if (orderInput.wareGroupId) {
                    query.andWhere("ware.wareGroupId = :wareGroupId", {
                        wareGroupId: orderInput.wareGroupId
                    });
                }

                if (orderInput.wareModelId) {
                    query.andWhere("ware.wareModelId = :wareModelId", {
                        wareModelId: orderInput.wareModelId
                    });
                }

                if (orderInput.wareDocument) {
                    query.andWhere("ware.document @@ plainto_tsquery(:query)", {
                        query: orderInput.wareDocument
                    });
                }

                if (orderInput.wareDocument) {
                    query.andWhere("ware.document @@ plainto_tsquery(:query)", {
                        query: orderInput.wareDocument
                    });
                }

                if (orderInput.trackingcode) {
                    query.andWhere("order.document @@ plainto_tsquery(:query)", {
                        query: orderInput.trackingcode
                    });
                }
                // }
                if (orderInput.statuses) {
                    query.andWhere("order.status IN (:...statuses)", {
                        statuses: orderInput.statuses
                    });
                }

                if (orderInput.trackingcode) {
                    query.andWhere("order.document @@ plainto_tsquery(:query)", {
                        query: orderInput.trackingcode
                    });
                }
                if (orderInput.startDate && orderInput.endDate) {
                    if (orderInput.endDate > orderInput.startDate) {
                        query.andWhere(
                            `"order"."createdAt"
                        BETWEEN :start AND :end`,
                            { start: orderInput.startDate, end: orderInput.endDate }
                        );
                    } else {
                        throw new BadRequestError("تاریخ شروع، باید قبل از تاریخ پایان بازه باشد");
                    }
                }
            }

            if (orderSort === OrderSort.CreatedAt_Desc) {
                addOrderBy(query, "order.createdAt", "DESC");
            } else if (orderSort === OrderSort.CreatedAt_Asd) {
                addOrderBy(query, "order.createdAt", "DESC");
            } else if (orderSort === OrderSort.Price_Asd) {
                addOrderBy(query, "order.totalPrice", "ASC");
            } else if (orderSort === OrderSort.Price_Desc) {
                addOrderBy(query, "order.totalPrice", "DESC");
            } else if (orderSort === OrderSort.Delivery_Asd) {
                addOrderBy(query, "order.deliveryTime", "ASC");
            } else if (orderSort === OrderSort.Delivery_Desc) {
                addOrderBy(query, "order.deliveryTime", "DESC");
            }
            // Pagination stuffs
            query
                .skip((paginationInput.page - 1) * paginationInput.take)
                .take(paginationInput.take);
            let result, count;

            if (orderInput && orderInput.getTotal) {
                [result, count] = await query.getManyAndCount();
            } else {
                result = await query.getMany();
            }
            return { items: result, total: count };
        } catch (err) {
            throw new BadRequestError(err) + err.message;
        }
    }

    @Query(() => Order, { name: getResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getOrder(@Arg("id") id: string, @Args() { user }: MyArgs) {
        if (!user) {
            throw new AuthenticationError();
        }
        try {
            await getOrderInputValidation.validate({ id });
            const order = await Order.findOne(id);

            if (!order) {
                throw new NotFoundError("چنین سفارشی");
            }

            if (
                isAuthorize(user, UserRole.Master) ||
                isAuthorize(user, UserRole.Admin, order.organizationId) ||
                isAuthorize(user, UserRole.OrganizationHead, order.organizationId) ||
                isAuthorize(user, UserRole.Expert, order.organizationId) ||
                isAuthorize(user, UserRole.FinanceHead, order.organizationId) ||
                isAuthorize(user, UserRole.FinanceEmployee, order.organizationId) ||
                isAuthorize(user, UserRole.UnitHead, order.unitId) ||
                isAuthorize(user, UserRole.UnitEmployee, order.unitId) ||
                (order.storeId && isAuthorize(user, UserRole.StoreHead, order.storeId))
            ) {
                return order;
            } else {
                throw new AuthorizationError();
            }
        } catch (e) {
            throw e.message;
        }
    }
    // next order o store modal
    @Query(() => Order)
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getNextOrder(
        @Arg("data")
        data: GetSingleOrderInput,
        @Args() { user }: MyArgs
    ) {
        if (!user) {
            throw new AuthenticationError();
        }
        try {
            await getNextOrderInputValidation.validate(data);
        } catch (e) {
            throw e.message;
        }

        const { orderId, storeId } = data;

        if (orderId && isAuthorize(user, UserRole.StoreHead, storeId)) {
            const order = await Order.findOne(orderId);

            if (!order) {
                throw new NotFoundError();
            }
            const rawArray = await getConnection().query(
                `WITH orders_of_store AS(
                        SELECT "order"."id",
                            LAG("order"."id",1) OVER (ORDER BY "order"."id") next_id
                        From "order"
                            INNER JOIN "site" ON "order"."storeId" = "site"."id"
                        WHERE "order"."storeId" = $1
                    )
                    SELECT  next_id
                        FROM orders_of_store
                    where "id" = $2`,
                [storeId, orderId]
            );
            // ORDER BY "order"."id" is high performance but in no order
            // ORDER BY "order"."createdAt" is low performance but gives orders in order of creation date
            const nextOrderId = rawArray[0].next_id;
            const nextOrder = await Order.findOne(nextOrderId);
            if (nextOrderId && nextOrder) {
                return nextOrder;
            } else {
                throw new NotFoundError("سفارش بعدی");
            }
        } else {
            throw new AuthorizationError();
        }
    }
    // previous order for store modal
    @Query(() => Order)
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getPreviousOrder(
        @Arg("data")
        data: GetSingleOrderInput,
        @Args() { user }: MyArgs
    ) {
        console.log(data.orderId);
        try {
            if (!user) {
                throw new AuthenticationError();
            }
            // await getPreviousOrderInput.validate(data);
            const { orderId, storeId } = data;

            if (orderId! && isAuthorize(user, UserRole.StoreHead, storeId)) {
                const order = await Order.findOne(orderId);

                if (!order) {
                    throw new NotFoundError("چنین سفارشی");
                }
                const rawArray = await getConnection().manager.query(
                    `WITH orders_of_store AS(
                        SELECT "order"."id", 
                            LEAD("order"."id",1) OVER (ORDER BY "order"."id") pre_id
                        From "order"
                            INNER JOIN "site" ON "order"."storeId" = "site"."id"
                         WHERE "order"."storeId" = $1
                    )
                    SELECT  pre_id
                        FROM orders_of_store
                    where "id" = $2`,
                    [storeId, orderId]
                );

                const previousOrderId = rawArray[0].pre_id;
                const previousOrder = await Order.findOne(previousOrderId);
                if (previousOrderId && previousOrder) {
                    return previousOrder;
                } else {
                    throw new NotFoundError("سفارش قبلی");
                }
            } else {
                throw new AuthorizationError();
            }
        } catch (error) {
            const msg = error.message ? error.message : "";
            throw "* " + msg + " *";
        }
    }

    @FieldResolver(() => Int, { nullable: true })
    async totalPrice(@Root() order: Order) {
        const stuff = await Stuff.findOne(order.stuffId);
        if (stuff && stuff.price && order.num)
            await Order.update(order.id, {
                totalPrice: () => `${stuff.price} * ${order.num}`
            });
        return order.totalPrice;
    }

    // @FieldResolver(() => , { nullable: true })
    // async Price(@Root() order: Order) {
    //     const stuff = await Stuff.findOne(order.stuffId);
    //     if (stuff && stuff.price && order.num)
    //         await Order.update(order.id, {
    //             totalPrice: () => `${stuff.price} * ${order.num}`
    //         });
    //     return order.totalPrice;
    // }
}
