import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";

import { uuidValidation } from "../sharedValidations/uuidValidation";
import { FastDeliveryTime } from "../../utils/enums/orderEnums";
import { LongPayment } from "../../utils/enums/siteEnums";
import { orderDateValidation } from "../sharedValidations/dateValidation";

export const createOrdetInputValidation = yup.object().shape({
  num: yup.number().required("لطفا تعداد مورد درخواست را وارد کنید "),

  remaining: yup.number(),

  wareId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر برای کالا وارد کنید "
  ),

  requestorUserId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر برای کاربر وارد کنید "
  ),

  organizationId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر برای سازمان وارد کنید "
  ),

  unitId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر  برای واحد وارد کنید "
  ),

  stuffId: uuidValidation("آیدی وارد شده درست نیست "),

  deliveryTime: orderDateValidation(),

  fastDelivery: yup.boolean().required("نوع تحویل را مشخص کنید"),

  fastDeliveryTime: enumValidation(FastDeliveryTime),

  longPayment: enumValidation(LongPayment)
});
