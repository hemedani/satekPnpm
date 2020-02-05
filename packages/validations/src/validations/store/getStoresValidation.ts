import * as yup from "yup";

import { enumValidation } from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import { StoreStatus } from "../../utils/enums/siteEnums";

export const getStoresInputValidation = yup.object().shape({
  status: enumValidation(StoreStatus),

  cityId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  stateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  document: yup.string() //how does a proper document look like ?
});

// pagination validation?
