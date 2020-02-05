import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const deleteUnitValidation = yup.object().shape({
  id: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
