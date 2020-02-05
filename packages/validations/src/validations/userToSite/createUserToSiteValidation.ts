import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";

import { uuidValidation } from "../sharedValidations/uuidValidation";
import { UserRole } from "../../utils/enums/userToSiteEnums";

export const CreateUserToSiteInputValidation = yup.object().shape({
  role: enumValidation(UserRole, "لطفا نقش کاربر را مشخص کنید"),

  userId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  siteId: uuidValidation("آیدی وارد شده درست نیست ")
});
