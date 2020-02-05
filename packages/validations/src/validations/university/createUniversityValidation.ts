import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  persianNameValidation,
  addressValidation
} from "../sharedValidations/sharedValidations";

export const createUniversityInputValidation = yup.object().shape({
  //check this one out again
  logoUrl: yup.string().required("آدرس لوگو را وارد کنید "),

  name: persianNameValidation("لطفا یک ناممعتبر وارد کنید"),

  address: addressValidation("لطفا یک ادرس معتبر وارد کنید"),

  location: yup.string(),

  contact: yup.string(),

  cityId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  stateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
