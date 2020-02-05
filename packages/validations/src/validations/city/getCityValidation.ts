import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getCitiesInputValidation = yup.object().shape({
  document: yup.string(),

  stateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر برای منطقه وارد کنید "
  )
});
