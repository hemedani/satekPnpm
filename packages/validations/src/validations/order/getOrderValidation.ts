import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getOrderInputValidation = yup.object().shape({
  id: uuidValidation(
    "آی دی وارد شده صحیح نیست ",
    "أطفا یک ای دی معتبر برای سفارش وارد کنید "
  )
});
