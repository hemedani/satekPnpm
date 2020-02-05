import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  englishNameValidation,
  persianNameValidation
} from "../sharedValidations/sharedValidations";

export const updateCityValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام فارسی معتبر وارد کنید"),

  enName: englishNameValidation("لطفا یک نام انگلیسی معتبر وارد کنید"),

  stateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  location: yup.string()
});
