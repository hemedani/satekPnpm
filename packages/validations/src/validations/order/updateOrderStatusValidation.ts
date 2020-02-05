import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";
import {
  OrderStatus,
  CheckBySupplier,
  CheckByStockclerk,
  CommentByExpertStatus,
  CommentByFinanceStatus,
  CheckByExpert,
  CheckByFinance
} from "../../utils/enums/orderEnums";

export const updateOrderStatusInputValidation = yup.object().shape({
  orderStatus: enumValidation(OrderStatus, "وضعیت سفارش را مشخص کنید"),

  checkBySupplier: enumValidation(CheckBySupplier),

  checkByStockclerk: enumValidation(CheckByStockclerk),

  commentByExpertStatus: enumValidation(CommentByExpertStatus),

  commentByFinanceStatus: enumValidation(CommentByFinanceStatus),

  checkByExpert: enumValidation(CheckByExpert),

  checkByFinance: enumValidation(CheckByFinance),

  comment: yup.string().min(10, "پیام شما حداقل باید ده کاراکتر باشد "),

  stockRemaining: yup.number()
});
