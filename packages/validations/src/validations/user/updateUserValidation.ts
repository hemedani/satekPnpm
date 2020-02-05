import * as yup from "yup";
import { passwordValidation } from "../sharedValidations/sharedValidations";

export const updateUserInputValidation = yup.object().shape({
  favoriteWaresIds: yup // check all to be id's
    .array<String>()
    .max(
      20,
      "حداکثر تعداد کالا های مورد علاقه نمی تواند بیشتر از بیست تا باشد "
    ),

  password: passwordValidation("لطفا یک پسورد وارد کنید "),

  photoUrl: yup.string(),

  isActive: yup.boolean()
});
