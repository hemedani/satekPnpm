import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

// should this be the same thing needed ?
// or the entire order should go throu validation?

export const updateStoreStatisticsValidation = yup.object().shape({
  storeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  totalPrice: yup.number(),

  num: yup.number().required("تعداد سفارش را وارد کنید ")
});
