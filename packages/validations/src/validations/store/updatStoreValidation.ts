import * as yup from "yup";

import {
  persianNameValidation,
  enumValidation,
  addressValidation,
  emailValidation
} from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  DeliveryTime,
  ActivityScope,
  ActivityType,
  PaymentDeadLine,
  ServiceRange,
  WorkingShift
} from "../../utils/enums/siteEnums";
import {
  StoreType,
  Gender,
  LegalPerson
} from "../../utils/enums/storeDetailsEnum";

export const updateStoreInputValidation = yup.object().shape({
  name: persianNameValidation(),

  selectedStatesIds: yup.array().of(yup.string()),

  cityDeliveryTime: enumValidation(DeliveryTime),

  stateDeliveryTime: enumValidation(DeliveryTime),

  selectedStateDeliveryTime: enumValidation(DeliveryTime),

  countryDeliveryTime: enumValidation(DeliveryTime),

  location: yup.string(),

  contact: yup.string(),

  address: addressValidation(),

  cityId: uuidValidation("آیدی وارد شده درست نیست "),

  stateId: uuidValidation("آیدی وارد شده درست نیست "),

  fastDelivery: yup.boolean(),

  activityScope: enumValidation(ActivityScope),

  activityType: enumValidation(ActivityType),

  paymentDeadLine: enumValidation(PaymentDeadLine),

  serviceRange: yup.array<keyof typeof ServiceRange>(),

  workingShift: enumValidation(WorkingShift),

  ceoname: persianNameValidation(),

  storeType: enumValidation(StoreType),

  economicCode: yup.string().min(1),

  postalCode: yup.string().min(1),

  ceoPostalCode: yup.string().min(1),

  ceoSsn: yup.string().min(1),

  mobileNumber: yup.string().min(1),

  ceoBirthDate: yup.date(),

  ceoGender: yup.mixed().oneOf(Object.values(Gender)),

  ceoCityId: uuidValidation("آیدی وارد شده درست نیست "),

  ceoStateId: uuidValidation("آیدی وارد شده درست نیست "),

  ceoAddress: addressValidation(),

  ceoContact: yup.string().min(1),

  email: emailValidation(), //good validation for the email fields

  ceoEmail: emailValidation(), //good validation for the email fields

  cardMelliUrl: yup.string().min(1), //good validation for the melli url , wtf is a mellyurl ?

  lastNewspaperUrl: yup.string().min(1),

  mojavvezUrl: yup.string().min(1),

  ceoPhotoUrl: yup.string().min(1),

  bankName: yup.string().min(1),

  bankCardNumber: yup.string().min(1),

  shebaNumber: yup.string().min(1),

  nameOfAccountHolder: yup.string().min(1),

  certificateNumber: yup.string().min(1),

  certificateExpireDate: yup.date(), //provide a cool way to check the expiredate

  legalPerson: enumValidation(LegalPerson),

  nationalId: yup.string().min(1) //need a cool way to accept melly code
});
