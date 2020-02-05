import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";

import { uuidValidation } from "../sharedValidations/uuidValidation";
import { OrderStatus, ChosenPayment } from "../../utils/enums/orderEnums";
import { LongPayment } from "../../utils/enums/siteEnums";

export const UpdateOrderStuffInputValidation = yup.object().shape({
  stuffId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  status: enumValidation(OrderStatus),

  num: yup.number(),

  chosenPayment: enumValidation(ChosenPayment),

  longPayment: enumValidation(LongPayment)
});
