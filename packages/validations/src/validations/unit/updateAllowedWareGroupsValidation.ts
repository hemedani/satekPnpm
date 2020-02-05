import * as yup from "yup";
import { uuidValidationObject } from "../sharedValidations/uuidValidation";

export const updateAllowedWareGroupsInputValidation = yup.object().shape({
  allowedWareGroupsIds: yup.array().of(uuidValidationObject)
});
