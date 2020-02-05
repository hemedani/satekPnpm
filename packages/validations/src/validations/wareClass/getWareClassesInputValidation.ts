import * as yup from "yup";

import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getWareClassesInputValidation = yup.object().shape({
  document: yup.string(),

  wareGroupId: uuidValidation("آیدی وارد شده درست نیست "),

  wareTypeId: uuidValidation("آیدی وارد شده درست نیست ")
});
