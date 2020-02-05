import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";

export const createCategoryValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام فارسی معتبر وارد کنید"),

  enName: englishNameValidation(),

  universityId: uuidValidation(
    "آی دی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر برای دانشگاه وارد کنید "
  ),

  organizationId: uuidValidation(
    "آی دی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر برای سازمان وارد کنید "
  ),

  cityId: uuidValidation(
    "آی دی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر  برای شهر وارد کنید "
  ),

  stateId: uuidValidation(
    "آی دی وارد شده درست نیست ",
    "لطفا یک آی دی معتبر  برای منطقه وارد کنید "
  )
});
