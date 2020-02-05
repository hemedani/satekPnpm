import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getNextOrderInputValidation = yup.object().shape({
  storeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر برای فروشگاه وارد کنید"
  ),

  orderId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر برای سفارش وارد کنید"
  )
});
