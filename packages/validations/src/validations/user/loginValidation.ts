import * as yup from "yup";

export const loginInputValidation = yup.object().shape({
  phone: yup.string().required("لطفا شماره ی تلفن همراه را وارد کنید."),

  device: yup.string().required("لطفا مدل تلفن همراه را وارد کنید."),

  code: yup.string().required("کد ارسال شده را وارد کنید .")
});
