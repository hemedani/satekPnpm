import * as yup from "yup";
import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";

export const updateWareClassInputValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام برای کلاس کالا مشخص کنید "),

  enName: englishNameValidation("نام انگلیسی کالا را وارد کنید "),

  wareTypeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
