import * as yup from "yup";
import {
  passwordValidation,
  persianLastNameValidation,
  persianNameValidation
} from "../sharedValidations/sharedValidations";
import { uuidValidationObject } from "../sharedValidations/uuidValidation";

export const updateUserDataInputValidation = yup.object().shape({
  firstName: persianNameValidation("لطفا یک نام معتبر وارد کنید "),
  lastName: persianLastNameValidation("لطفا یک نام خانوادگی وارد کنید "),

  ssn: yup.string().required("لطفا کد اس اس ان را وارد کنید "),

  phoneNumber: yup.string(),

  photoUrl: yup.string(),

  password: passwordValidation(),

  allowedWaresIds: yup
    .array()
    .of(uuidValidationObject)
    .required("لطفا لیست کالا های مجاز را مشخص کنید")
});
