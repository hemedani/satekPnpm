import * as yup from "yup";
import { generalNameValidation } from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const updateWareInputValidation = yup.object().shape({
  name: generalNameValidation("لطفا یک نام مناسب وارد کنید "),

  enName: generalNameValidation(),

  brand: yup.string(),

  price: yup.number(),

  umdns: yup.number(),

  gtin: yup.number(),

  irc: yup.string(),

  manufacturerId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareTypeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareClassId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareGroupId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareModelId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
