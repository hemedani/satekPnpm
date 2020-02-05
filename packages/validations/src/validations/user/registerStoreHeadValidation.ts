import * as yup from "yup";
import {
  persianNameValidation,
  persianLastNameValidation,
  mobilePhoneValidation,
  passwordValidation
} from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const registerStoreHeadValidation = yup.object().shape({
  photoUrl: yup.string().required("آدرس url عکس را وارد کنید"),

  firstName: persianNameValidation("لطفا یک نام معتبر وارد کنید "),

  lastName: persianLastNameValidation("لطفا یک نام معتبر وارد کنید "),

  ssn: yup.string().required("کد اس اس ان را وارد کنید"), // needs some good ssn validation

  phoneNumber: mobilePhoneValidation("لطفا یک شماره تلفن همراه وارد کنید"),

  password: passwordValidation(),

  organizationId: uuidValidation("آیدی وارد شده درست نیست ")
});
