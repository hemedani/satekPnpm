import {
    Arg,
    Mutation,
    Resolver,
    UseMiddleware,
    FieldResolver,
    Root,
    Int,
    Query,
    Args
} from "type-graphql";
import { Store } from "../../entity/Site";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { MasterMiddlewares, NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { UpdateStoreStatusInput } from "./domains/UpdateStoreStatusInput";
import { BadCreateError } from "../../errors/BadCreateError";
import { CreateStoreInput } from "./domains/CreateStoreInput";
import { StoreDetails } from "../../entity/StoreDetails";
import { getManager, getRepository } from "typeorm";
import { NotFoundError } from "../../errors/NotFoundError";
import { UpdateStoreInput } from "./domains/UpdateStoreInput";
import { Order, OrderStatus } from "../../entity/Order";
import { PaginationInput } from "../base/domains/PaginationInput";
import { GetStoreInput } from "./domains/GetStoreInput";
import { registerStoreHead } from "../user/Register.resolver";
import { RegisterInput } from "../user/domains/RegisterInput";
import { UserToSite, UserRole } from "../../entity/UserToSite";
import { User } from "../../entity/User";
import { checkAuthorization } from "../../utils/authorizationHelper";
import { MyArgs } from "../../types/MyArgs";

@Resolver(() => Store)
export class StoreResolver {
    @Mutation(() => Store)
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async updateStoreStatus(
        @Arg("id") storeId: string,
        @Arg("data") updateStoreStatusInput: UpdateStoreStatusInput
    ) {
        const { status, updateStatusDescription } = updateStoreStatusInput;
        try {
            await Store.update(storeId, {
                status,
                updateStatusDescription
            });
        } catch {
            throw new BadUpdateError();
        }

        // Activate/Deactive the StoreHead
        try {
            const userToSite = await UserToSite.findOne({ where: { siteId: storeId } });
            if (userToSite && userToSite.userId)
                await User.update(userToSite.userId, {
                    isActive: updateStoreStatusInput.isActive
                });
        } catch (e) {
            throw new BadUpdateError(e);
        }
        return Store.findOne(storeId);
    }

    @Mutation(() => Store)
    @UseMiddleware(...defaultMiddleWares())
    async createStore(@Arg("data") createStoreInput: CreateStoreInput) {
        try {
            const storeDetail = new StoreDetails();
            storeDetail.ceoEmail = createStoreInput.ceoEmail;
            storeDetail.email = createStoreInput.email;
            storeDetail.storeType = createStoreInput.storeType;
            storeDetail.ceoSsn = createStoreInput.ceoSsn;
            storeDetail.mobileNumber = Number(createStoreInput.mobileNumber);
            storeDetail.ceoBirthDate = createStoreInput.ceoBirthDate;
            storeDetail.ceoGender = createStoreInput.ceoGender;
            storeDetail.ceoCityId = createStoreInput.ceoCityId;
            storeDetail.ceoStateId = createStoreInput.ceoStateId;
            storeDetail.ceoPostalCode = createStoreInput.ceoPostalCode;
            storeDetail.ceoAddress = createStoreInput.ceoAddress;
            storeDetail.ceoContact = createStoreInput.ceoContact;
            storeDetail.cardMelliUrl = createStoreInput.cardMelliUrl;
            storeDetail.ceoPhotoUrl = createStoreInput.ceoPhotoUrl;
            storeDetail.economicCode = createStoreInput.economicCode;
            storeDetail.postalCode = createStoreInput.postalCode;
            storeDetail.lastNewspaperUrl = createStoreInput.lastNewspaperUrl;
            storeDetail.mojavvezUrl = createStoreInput.mojavvezUrl;
            storeDetail.bankName = createStoreInput.bankName;
            storeDetail.bankCardNumber = createStoreInput.bankCardNumber;
            storeDetail.shebaNumber = createStoreInput.shebaNumber;
            storeDetail.nameOfAccountHolder = createStoreInput.nameOfAccountHolder;
            storeDetail.certificateNumber = createStoreInput.certificateNumber;
            storeDetail.certificateExpireDate = createStoreInput.certificateExpireDate;
            storeDetail.legalPerson = createStoreInput.legalPerson;
            storeDetail.nationalId = createStoreInput.nationalId;

            const store = new Store();
            store.ceoname = createStoreInput.ceoFirstName + createStoreInput.ceoLastName;
            store.stateId = createStoreInput.stateId;
            store.name = createStoreInput.name;
            store.selectedStatesIds = createStoreInput.selectedStatesIds;
            store.cityDeliveryTime = createStoreInput.cityDeliveryTime;
            store.selectedStateDeliveryTime = createStoreInput.selectedStateDeliveryTime;
            store.countryDeliveryTime = createStoreInput.countryDeliveryTime;
            store.serviceRange = createStoreInput.serviceRange;
            store.cityId = createStoreInput.cityId;
            store.fastDelivery = createStoreInput.fastDelivery;
            store.activityScope = createStoreInput.activityScope;
            store.activityType = createStoreInput.activityType;
            store.paymentDeadLine = createStoreInput.paymentDeadLine;
            store.workingShift = createStoreInput.workingShift;
            store.address = createStoreInput.address;
            store.location = createStoreInput.location;
            store.contact = createStoreInput.contact;
            store.logoUrl = createStoreInput.logoUrl;
            store.storeDetails = storeDetail;

            await getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(storeDetail);
                await transactionalEntityManager.save(store);
            });

            const registerInput: RegisterInput = {
                photoUrl: createStoreInput.ceoPhotoUrl,
                firstName: createStoreInput.ceoFirstName,
                lastName: createStoreInput.ceoLastName,
                ssn: createStoreInput.ceoSsn,
                phoneNumber: createStoreInput.mobileNumber
            };
            try {
                await registerStoreHead(registerInput);
            } catch (e) {
                throw new BadCreateError(e);
            }
            return store;
        } catch (e) {
            throw new BadCreateError(e);
        }
    }
    @Mutation(() => Store)
    @UseMiddleware(...defaultMiddleWares())
    async updateStore(@Arg("data") updateStoreInput: UpdateStoreInput, @Arg("id") id: string) {
        // try {
        //     await updateStoreInputValidation.validate(updateStoreInput);
        // } catch (error) {
        //     new BadUpdateError(error);
        // }
        const createdStore = await Store.findOne(id);
        if (!createdStore) {
            throw new NotFoundError(" فروشگاه ");
        }
        const storeId = createdStore.id;

        const detailId = createdStore.storeDetailsId;
        const details = await StoreDetails.findOne(detailId);
        if (!details) throw new NotFoundError("جزییات فروشگاه");

        try {
            await Store.update(storeId, {
                ceoname: updateStoreInput.ceoname ? updateStoreInput.ceoname : createdStore.ceoname,
                stateId: updateStoreInput.stateId ? updateStoreInput.stateId : createdStore.stateId,
                name: updateStoreInput.name ? updateStoreInput.name : createdStore.name,
                selectedStatesIds: updateStoreInput.selectedStatesIds
                    ? updateStoreInput.selectedStatesIds
                    : createdStore.selectedStatesIds,
                cityDeliveryTime: updateStoreInput.cityDeliveryTime
                    ? updateStoreInput.cityDeliveryTime
                    : createdStore.cityDeliveryTime,
                selectedStateDeliveryTime: updateStoreInput.selectedStateDeliveryTime
                    ? updateStoreInput.selectedStateDeliveryTime
                    : createdStore.selectedStateDeliveryTime,
                countryDeliveryTime: updateStoreInput.countryDeliveryTime
                    ? updateStoreInput.countryDeliveryTime
                    : createdStore.countryDeliveryTime,
                serviceRange: updateStoreInput.serviceRange
                    ? updateStoreInput.serviceRange
                    : createdStore.serviceRange,
                cityId: updateStoreInput.cityId ? updateStoreInput.cityId : createdStore.cityId,
                fastDelivery: updateStoreInput.fastDelivery
                    ? updateStoreInput.fastDelivery
                    : createdStore.fastDelivery,
                activityScope: updateStoreInput.activityScope
                    ? updateStoreInput.activityScope
                    : createdStore.activityScope,
                activityType: updateStoreInput.activityType
                    ? updateStoreInput.activityType
                    : createdStore.activityType,
                paymentDeadLine: updateStoreInput.paymentDeadLine
                    ? updateStoreInput.paymentDeadLine
                    : createdStore.paymentDeadLine,
                workingShift: updateStoreInput.workingShift
                    ? updateStoreInput.workingShift
                    : createdStore.workingShift,
                address: updateStoreInput.address ? updateStoreInput.address : createdStore.address,
                location: updateStoreInput.location
                    ? updateStoreInput.location
                    : createdStore.location,
                contact: updateStoreInput.contact ? updateStoreInput.contact : createdStore.contact,
                logoUrl: updateStoreInput.logoUrl ? updateStoreInput.logoUrl : createdStore.logoUrl
            });
            await StoreDetails.update(detailId, {
                email: updateStoreInput.email ? updateStoreInput.email : details.email,
                ceoEmail: updateStoreInput.ceoEmail ? updateStoreInput.ceoEmail : details.ceoEmail,
                storeType: updateStoreInput.storeType
                    ? updateStoreInput.storeType
                    : details.storeType,
                ceoSsn: updateStoreInput.ceoSsn ? updateStoreInput.ceoSsn : details.ceoSsn,
                mobileNumber: updateStoreInput.mobileNumber
                    ? Number(updateStoreInput.mobileNumber)
                    : details.mobileNumber,
                ceoBirthDate: updateStoreInput.ceoBirthDate
                    ? updateStoreInput.ceoBirthDate
                    : details.ceoBirthDate,
                ceoGender: updateStoreInput.ceoGender
                    ? updateStoreInput.ceoGender
                    : details.ceoGender,
                ceoCityId: updateStoreInput.ceoCityId
                    ? updateStoreInput.ceoCityId
                    : details.ceoCityId,
                ceoStateId: updateStoreInput.ceoStateId
                    ? updateStoreInput.ceoStateId
                    : details.ceoStateId,
                ceoPostalCode: updateStoreInput.ceoPostalCode
                    ? updateStoreInput.ceoPostalCode
                    : details.ceoPostalCode,
                ceoAddress: updateStoreInput.ceoAddress
                    ? updateStoreInput.ceoAddress
                    : details.ceoAddress,
                ceoContact: updateStoreInput.ceoContact
                    ? updateStoreInput.ceoContact
                    : details.ceoContact,
                cardMelliUrl: updateStoreInput.cardMelliUrl
                    ? updateStoreInput.cardMelliUrl
                    : details.cardMelliUrl,
                ceoPhotoUrl: updateStoreInput.ceoPhotoUrl
                    ? updateStoreInput.ceoPhotoUrl
                    : details.ceoPhotoUrl,
                economicCode: updateStoreInput.economicCode
                    ? updateStoreInput.economicCode
                    : details.economicCode,
                postalCode: updateStoreInput.postalCode
                    ? updateStoreInput.postalCode
                    : details.postalCode,
                lastNewspaperUrl: updateStoreInput.lastNewspaperUrl
                    ? updateStoreInput.lastNewspaperUrl
                    : details.lastNewspaperUrl,
                mojavvezUrl: updateStoreInput.mojavvezUrl
                    ? updateStoreInput.mojavvezUrl
                    : details.mojavvezUrl,
                bankName: updateStoreInput.bankName ? updateStoreInput.bankName : details.bankName,
                bankCardNumber: updateStoreInput.bankCardNumber
                    ? updateStoreInput.bankCardNumber
                    : details.bankCardNumber,
                shebaNumber: updateStoreInput.shebaNumber
                    ? updateStoreInput.shebaNumber
                    : details.shebaNumber,
                nameOfAccountHolder: updateStoreInput.nameOfAccountHolder
                    ? updateStoreInput.nameOfAccountHolder
                    : details.nameOfAccountHolder,
                certificateNumber: updateStoreInput.certificateNumber
                    ? updateStoreInput.certificateNumber
                    : details.certificateNumber,
                legalPerson: updateStoreInput.legalPerson
                    ? updateStoreInput.legalPerson
                    : details.legalPerson,
                nationalId: updateStoreInput.nationalId
                    ? updateStoreInput.nationalId
                    : details.nationalId,
                certificateExpireDate: updateStoreInput.certificateExpireDate
                    ? updateStoreInput.certificateExpireDate
                    : details.certificateExpireDate
            });
        } catch (e) {
            throw new BadUpdateError(e);
        }
        return await Store.findOne(id);
    }

    @Query(() => [Store])
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async getStores(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true })
        storeInput: GetStoreInput
    ) {
        const query = getRepository(Store).createQueryBuilder("store");
        if (storeInput) {
            if (storeInput.cityId)
                query.andWhere("store.cityId = :cityId ", { cityId: storeInput.cityId });
            if (storeInput.stateId)
                query.andWhere("store.stateId = :stateId ", { stateId: storeInput.stateId });
            if (storeInput.status)
                query.andWhere("store.status = :status", { status: storeInput.status });
            if (storeInput.document)
                query.andWhere("store.document @@ plainto_tsquery(:query)", {
                    query: storeInput.document
                });
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return query.getMany();
    }
    @Query(() => Store)
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares) //should be admin and storeHead
    async getStore(@Arg("id") id: string, @Args() { user }: MyArgs) {
        if (user) checkAuthorization(user, UserRole.StoreHead, id);

        const store = Store.findOne(id);
        if (store) {
            return store;
        } else {
            throw new NotFoundError();
        }
    }

    @FieldResolver(() => Int)
    async totalFastDelivery(@Root() store: Store) {
        return await getRepository(Order)
            .createQueryBuilder("order")
            .where("order.storeId = :id", { id: store.id })
            .andWhere("order.fastDelivery = true ")
            .andWhere("order.status = :status", { status: OrderStatus.pendingInStore })
            .getCount();
    }

    @FieldResolver(() => Int)
    async totalNewOrder(@Root() store: Store) {
        return await getRepository(Order)
            .createQueryBuilder("order")
            .where("order.storeId = :id", { id: store.id })
            .andWhere("order.status = :status", { status: OrderStatus.pendingInStore })
            .getCount();
    }
    @FieldResolver(() => Int)
    async totalNotCompleted(@Root() store: Store) {
        return await getRepository(Order)
            .createQueryBuilder("order")
            .where("order.storeId = :id", { id: store.id })
            .andWhere("order.status = :status", { status: OrderStatus.PreparationByStore })
            .andWhere("order.status = :status", { status: OrderStatus.sentByStore })
            .getCount();
    }
}

export const updateStoreStatistics = async (order: Order) => {
    if (order.storeId && order.totalPrice && order.num) {
        await Store.update(order.storeId, {
            totalNotPaid: () => `"totalNotPaid" + ${order.totalPrice}`,
            totalSoldAmount: () => `"totalSoldAmount" + ${order.totalPrice}`,
            totalSoldNum: () => `"totalSoldNum" + ${order.num}`
        });
    } else {
        throw new BadUpdateError("اطلاعات سفارش کامل نیست");
    }
};
