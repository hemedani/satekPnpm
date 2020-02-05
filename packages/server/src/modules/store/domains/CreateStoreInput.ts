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
import { CreateSiteInput } from "../../site/domains/CreateSiteInput";
import { Length } from "class-validator";
import { Gender, LegalPerson, StoreType } from "../../../entity/StoreDetails";

@InputType()
export class CreateStoreInput extends CreateSiteInput implements Partial<Store> {
    @Field()
    @Length(1, 255)
    name: string;

    @Field(() => [String], { nullable: true })
    selectedStatesIds?: string[];

    @Field(() => DeliveryTime)
    cityDeliveryTime: DeliveryTime;

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

    // @Field(() => [UserToSite], { nullable: true })
    // userToSites?: UserToSite[];

    @Field()
    cityId: string;

    @Field()
    stateId: string;

    @Field()
    fastDelivery: boolean;

    @Field(() => ActivityScope)
    activityScope: ActivityScope;

    @Field(() => ActivityType)
    activityType: ActivityType;

    @Field(() => PaymentDeadLine)
    paymentDeadLine: PaymentDeadLine;

    @Field(() => [ServiceRange])
    serviceRange: ServiceRange[];

    @Field(() => WorkingShift)
    workingShift: WorkingShift;

    @Field()
    @Length(1, 255)
    ceoFirstName: string;

    @Field()
    @Length(1, 255)
    ceoLastName: string;

    @Field(() => StoreType)
    storeType: StoreType;

    @Field()
    @Length(1, 255)
    economicCode: string;

    @Field()
    @Length(1, 255)
    postalCode: string;

    @Field()
    @Length(1, 255)
    ceoPostalCode: string;

    @Field()
    @Length(1, 255)
    ceoSsn: string;

    @Field()
    mobileNumber: string;

    @Field()
    ceoBirthDate: Date;

    @Field(() => Gender)
    ceoGender: Gender;

    @Field()
    ceoCityId: string;

    @Field()
    ceoStateId: string;

    @Field()
    @Length(1, 255)
    ceoAddress: string;

    @Field()
    @Length(1, 255)
    ceoContact: string;

    @Field()
    @Length(1, 255)
    email: string;

    @Field()
    @Length(1, 255)
    ceoEmail: string;

    @Field()
    @Length(1, 255)
    cardMelliUrl: string;

    @Field()
    @Length(1, 255)
    lastNewspaperUrl: string;

    @Field()
    @Length(1, 255)
    mojavvezUrl: string;

    @Field()
    @Length(1, 255)
    ceoPhotoUrl: string;

    @Field()
    @Length(1, 255)
    bankName: string;

    @Field()
    @Length(1, 255)
    bankCardNumber: string;

    @Field()
    @Length(1, 255)
    shebaNumber: string;

    @Field()
    @Length(1, 255)
    nameOfAccountHolder: string;

    @Field()
    @Length(1, 255)
    certificateNumber: string;

    @Field()
    certificateExpireDate: Date;

    @Field(() => LegalPerson)
    legalPerson: LegalPerson;

    @Field()
    @Length(1, 255)
    nationalId: string;
}
