import * as yup from "yup";

import { uuidValidation } from "../sharedValidations/uuidValidation";

export const getWareModelsInputValidation = yup.object().shape({
  wareGroupId: uuidValidation("آیدی وارد شده درست نیست "),

  document: yup.string()
});
