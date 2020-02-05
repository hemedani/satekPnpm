import * as yup from "yup";

import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getWaresInputValidation = yup.object().shape({
  document: yup.string(),

  wareGroupId: uuidValidation("آیدی وارد شده درست نیست "),

  wareClassId: uuidValidation("آیدی وارد شده درست نیست "),

  wareModelId: uuidValidation("آیدی وارد شده درست نیست "),

  userId: uuidValidation("آیدی وارد شده درست نیست ")
});
