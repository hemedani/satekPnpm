import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import { enumValidation } from "../sharedValidations/sharedValidations";
import { UserRole } from "../../utils/enums/userToSiteEnums";

export const getUsersPaginationInputValidation = yup.object().shape({
  page: yup.number().required("شماره صفحه را وارد کنید"),

  take: yup.number().required("تعداد داده های برگشتی را مشخص کنید ")
});

export const getUsersInputValidation = yup.object().shape({
  document: yup.string(),

  organizationId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),
  unitId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  role: enumValidation(UserRole),

  wareName: yup.string(),

  wareDocument: yup.string(),

  wareGroupId: uuidValidation("آیدی وارد شده درست نیست "),

  wareClassId: uuidValidation("آیدی وارد شده درست نیست ")
});
