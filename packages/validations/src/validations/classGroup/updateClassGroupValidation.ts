import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const updateClassGroupValidation = yup.object().shape({
  wareClassId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),
  wareGroupId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
