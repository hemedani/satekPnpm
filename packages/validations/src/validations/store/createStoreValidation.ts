import * as yup from "yup";

import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  persianNameValidation,
  enumValidation,
  addressValidation,
  emailValidation
} from "../sharedValidations/sharedValidations";
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

export const createStoreInputValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام فارسی معتبر وارد کنید ."),

  selectedStatesIds: yup.array().of(yup.string()),

  cityDeliveryTime: enumValidation(
    DeliveryTime,
    "لطفا یک زمان تحویل شهری تعیین کنید "
  ),

  stateDeliveryTime: enumValidation(DeliveryTime),

  selectedStateDeliveryTime: enumValidation(DeliveryTime), //needs to be tested

  countryDeliveryTime: enumValidation(DeliveryTime),

  location: yup.string(),

  contact: yup.string(),

  cityId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  stateId: uuidValidation(
    "آیدی وارد شده صحیح نیست ",
    "لطفا آیدی مناسب وارد کنید "
  ), //proper id regex

  fastDelivery: yup.boolean().required("Please Choose your Delivery type"),

  activityScope: enumValidation(
    ActivityScope,
    "لطفا محدوده فعالیت خودرا مشخص کنید "
  ),

  activityType: enumValidation(
    ActivityType,
    "لطفا نوع فعالیت خودرا مشخص کنید "
  ),

  paymentDeadLine: enumValidation(
    PaymentDeadLine,
    "لطفا نوع payment deadline مشخص کنید "
  ),

  //should check
  serviceRange: yup
    .array<keyof typeof ServiceRange>()
    .required("Pleasse provide the service range"),

  workingShift: enumValidation(WorkingShift, "لطفا شیفت کاری را مشخص کنید  "),

  ceoFirstName: persianNameValidation("لطفا یک نام معتبر وارد کنید ."), //this needs more validation options for the name,

  ceoLastName: persianNameValidation("لطفا یک نام معتبر وارد کنید ."), //this needs more validation options for the name,

  storeType: enumValidation(StoreType, "لطفا نوع فروشگاه را مشخص کنید "),

  economicCode: yup // how is the econimic code ?
    .string()
    .min(1)
    .required("Please Provide economic Code"),

  postalCode: yup //postal code validation
    .string()
    .min(1)
    .required("Please Provide postal Code"),

  ceoPostalCode: yup
    .string()
    .min(1)
    .required("Please Provide ceo's postal Code"),

  ceoSsn: yup //how is ssn ?
    .string()
    .min(1)
    .required("Please Provide ceo's ssn Code"),

  mobileNumber: yup //mobile validation is needed too
    .string()
    .min(1)
    .required("Please Provide Phone Number"),

  ceoBirthDate: yup.date().required("لطفا تاریخ تولد را مشخص کنید "),

  ceoGender: enumValidation(Gender, "لطفا جنسیت را مشخص کنید "),

  ceoCityId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  ceoStateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  ceoAddress: addressValidation("لطفا یک ادرس معتبر وارد کنید"),

  ceoContact: yup //how is the contact
    .string()
    .min(1)
    .required("Please Provide ceo's contact"),

  email: emailValidation("لطفا یک ایمیل معتبر وارد کنید "),

  ceoEmail: emailValidation("لطفا یک ایمیل معتبر وارد کنید "),

  cardMelliUrl: yup
    .string()
    .min(1)
    .required("آدرس کارت ملی را وارد کنید "), //good validation for the melli url , wtf is a mellyurl ?

  lastNewspaperUrl: yup
    .string()
    .min(1)
    .required("Please Provide ceo's last newspaper url"),

  mojavvezUrl: yup
    .string()
    .min(1)
    .required("Please Provide ceo's mojavvezUrl"),

  ceoPhotoUrl: yup
    .string()
    .min(1)
    .required("Please Provide ceo's ceoPhotoUrl"),

  bankName: yup
    .string()
    .min(1)
    .required("نام بانک را وارد کنید"),

  bankCardNumber: yup
    .string()
    .min(1)
    .required("شماره کارت بانکی را وارد کنید "),

  shebaNumber: yup
    .string()
    .min(1)
    .required("شماره شبا را وارد کنید "),

  nameOfAccountHolder: yup
    .string()
    .min(1)
    .required("نام صاحب حساب را وارد کنید "),

  certificateNumber: yup
    .string()
    .min(1)
    .required("Please Provide Certificate Number"),

  certificateExpireDate: yup.date(), //provide a cool way to check the expiredate

  legalPerson: enumValidation(LegalPerson),

  nationalId: yup
    .string()
    .min(1)
    .required("Please Provide a melly Code") //need a cool way to accept melly code
});
