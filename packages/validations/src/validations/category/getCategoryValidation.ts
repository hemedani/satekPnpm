import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getCategoryValidation = yup.object().shape({
  id: uuidValidation(
    "آی دی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر برای دسته بندی وارد کنید "
  )
});
