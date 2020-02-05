import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import { enumValidation } from "../sharedValidations/sharedValidations";
import {
  CommentByExpertStatusInput,
  CommentByFinanceStatusInput,
  CheckBySupplierStatusInput,
  CheckByStockclerkStatusInput
} from "../../utils/enums/orderInputEnums";
import {
  CheckBySupplier,
  CheckByStockclerk,
  OrderStatus
} from "../../utils/enums/orderEnums";

export const getOrdersInputValidation = yup.object().shape({
  wareDocument: yup.string(),

  fastDelivery: yup.boolean(),

  trackingcode: yup.string(),

  organizationId: uuidValidation("آیدی وارد شده درست نیست "),

  unitId: uuidValidation("آیدی وارد شده درست نیست "),

  storeId: uuidValidation("آیدی وارد شده درست نیست "),

  statuses: yup.array<OrderStatus>(),

  irc: yup.string(),

  commentByExpertStatusInput: enumValidation(CommentByExpertStatusInput),

  commentByFinanceStatusInput: enumValidation(CommentByFinanceStatusInput),

  checkBySupplierStatusInput: enumValidation(CheckBySupplierStatusInput),

  checkByStockclerkStatusInput: enumValidation(CheckByStockclerkStatusInput),

  checkBySupplier: enumValidation(CheckBySupplier),

  checkByStockclerk: enumValidation(CheckByStockclerk),

  startDate: yup.date(),

  endDate: yup.date(),

  wareTypeId: yup.string(),

  wareClassId: yup.string(),

  wareGroupId: yup.string(),

  wareModelId: yup.string(),

  storeHeadId: yup.string(),

  getTotal: yup.boolean()
});
