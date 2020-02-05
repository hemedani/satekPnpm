import * as yup from "yup";
import { mobilePhoneValidation } from "../sharedValidations/sharedValidations";

export const loginRequestInputValidation = yup.object().shape({
  phone: mobilePhoneValidation("لطفا شماره ی تلفن همراه را وارد کنید."),

  device: yup.string().required("لطفا مدل تلفن همراه را وارد کنید.")
});
