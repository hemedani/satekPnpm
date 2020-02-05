import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";
import { OrderStatus, ChosenPayment } from "../../utils/enums/orderEnums";
import { LongPayment } from "../../utils/enums/siteEnums";

export const UpdateOrderInputValidation = yup.object().shape({
  status: enumValidation(OrderStatus),

  deliveryTime: yup.date(),

  chosenPayment: enumValidation(ChosenPayment),

  longPayment: enumValidation(LongPayment)
});
