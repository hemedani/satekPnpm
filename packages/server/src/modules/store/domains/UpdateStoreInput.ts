import { Field, InputType } from "type-graphql";
import {
    ActivityScope,
    DeliveryTime,
    PaymentDeadLine,
    ServiceRange,
    WorkingShift,
    Store,
    ActivityType
} from "../../../entity/Site";
import { Length } from "class-validator";
import { Gender, LegalPerson, StoreType } from "../../../entity/StoreDetails";

@InputType()
export class UpdateStoreInput implements Partial<Store> {
    @Field({ nullable: true })
    @Length(1, 255)
    name?: string;

    @Field(() => [String], { nullable: true })
    selectedStatesIds?: string[];

    @Field(() => DeliveryTime, { nullable: true })
    cityDeliveryTime?: DeliveryTime;

    @Field(() => DeliveryTime, { nullable: true })
    stateDeliveryTime?: DeliveryTime;

    @Field(() => DeliveryTime, { nullable: true })
    selectedStateDeliveryTime?: DeliveryTime;

    @Field(() => DeliveryTime, { nullable: true })
    countryDeliveryTime?: DeliveryTime;

    @Field({ nullable: true })
    location?: string;

    @Field({ nullable: true })
    contact?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    address?: string;

    //whats this field?
    // @Field(() => [UserToSite], { nullable: true })
    // userToSites?: UserToSite[];

    @Field({ nullable: true })
    cityId?: string;

    @Field({ nullable: true })
    stateId?: string;

    @Field({ nullable: true })
    fastDelivery?: boolean;

    @Field(() => ActivityScope, { nullable: true })
    activityScope?: ActivityScope;

    @Field(() => ActivityType, { nullable: true })
    activityType?: ActivityType;

    @Field(() => PaymentDeadLine, { nullable: true })
    paymentDeadLine?: PaymentDeadLine;

    @Field(() => [ServiceRange], { nullable: true })
    serviceRange?: ServiceRange[];

    @Field(() => WorkingShift, { nullable: true })
    workingShift?: WorkingShift;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoname?: string;

    @Field(() => StoreType, { nullable: true })
    storeType?: StoreType;

    @Field({ nullable: true })
    @Length(1, 255)
    economicCode?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    postalCode?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoPostalCode?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoSsn?: string;

    @Field({ nullable: true })
    mobileNumber?: string;

    @Field({ nullable: true })
    ceoBirthDate?: Date;

    @Field(() => Gender, { nullable: true })
    ceoGender?: Gender;

    @Field({ nullable: true })
    ceoCityId?: string;

    @Field({ nullable: true })
    ceoStateId?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoAddress?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoContact?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    email?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoEmail?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    cardMelliUrl?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    lastNewspaperUrl?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    mojavvezUrl?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    ceoPhotoUrl?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    logoUrl?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    bankName?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    bankCardNumber?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    shebaNumber?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    nameOfAccountHolder?: string;

    @Field({ nullable: true })
    @Length(1, 255)
    certificateNumber?: string;

    @Field({ nullable: true })
    certificateExpireDate?: Date;

    @Field(() => LegalPerson, { nullable: true })
    legalPerson?: LegalPerson;

    @Field({ nullable: true })
    @Length(1, 255)
    nationalId?: string;
}
