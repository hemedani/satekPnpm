import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const updateAllowedWaresForUserValidation = yup.object().shape({
  allowedWaresIds: yup
    .array<String>()
    .required("لطفا لیستی از کالا های مجاز را معرفی کنید ")
});

export const updateAllowedWaresForUser_id_Validation = yup.object().shape({
  userId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
