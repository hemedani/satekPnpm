import * as yup from "yup";

import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const createWareModelInputValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام برای کلاس کالا مشخص کنید "),

  enName: englishNameValidation("نام انگلیسی کالا را وارد کنید "),

  wareTypeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareClassId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareGroupId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
