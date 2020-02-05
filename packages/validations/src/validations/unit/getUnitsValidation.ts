import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getUnitsPaginationInputValidation = yup.object().shape({
  page: yup.number().required("شماره صفحه را وارد کنید"),

  take: yup.number().required("تعداد داده های برگشتی را مشخص کنید ")
});

export const getUnitsInputValidation = yup.object().shape({
  document: yup.string(),

  organizationId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
