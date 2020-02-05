import * as yup from "yup";
import {
  uuidValidation,
  uuidValidationObject
} from "../sharedValidations/uuidValidation";
import { enumValidation } from "../sharedValidations/sharedValidations";
import { LongPayment } from "../../utils/enums/siteEnums";
import { StuffSort } from "../../utils/enums/stuffInputEnums";

export const getStuffsPaginationInputValidation = yup.object().shape({
  page: yup.number().required("شماره صفحه را وارد کنید"),

  take: yup.number().required("تعداد داده های برگشتی را مشخص کنید ")
});

export const getStuffsStuffInputValidation = yup.object().shape({
  wareDocument: yup.string(),

  wareTypeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareClassIds: yup.array().of(uuidValidationObject), //this one should be tested

  wareGroupIds: yup.array().of(uuidValidationObject), //this one should be tested

  wareModelId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  manufacturerId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  storeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  storeHeadId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  inventoryNo: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  expiration: yup.date(),

  longPayment: enumValidation(LongPayment),

  getTotal: yup.boolean()
});

export const getStuffsStuffSortValidation = yup.object().shape({
  stuffSort: enumValidation(StuffSort)
});
