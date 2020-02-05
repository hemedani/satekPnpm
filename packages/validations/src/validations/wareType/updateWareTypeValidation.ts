import * as yup from "yup";

import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";

export const updateWareTypeInputValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام برای کلاس کالا مشخص کنید "),

  enName: englishNameValidation()
});
