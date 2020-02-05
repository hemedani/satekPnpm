import * as yup from "yup";
import { countryNameLengthError } from "../../utils/messages";
import { persianNameReg, englishNameReg, emailReg } from "../../utils/regex";

export const persianNameValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(persianNameReg, "باید یک نام فارسی وارد کنید ")
      .required(message);
  else
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(persianNameReg, "باید یک نام فارسی وارد کنید ");
};

export const persianLastNameValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(persianNameReg, "باید یک نام خانوادگی فارسی وارد کنید ")
      .required(message);
  else
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(persianNameReg, "باید یک نام خانوادگی فارسی وارد کنید ");
};

export const englishNameValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(4, "نام خارجی باید حداقل چهار کاراکتر باشد")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(englishNameReg, "نام انگلیسی نمیتواند شامل حروف فارسی باشد ")
      .required(message);
  else
    return yup
      .string()
      .min(4, "نام خارجی باید حداقل چهار کاراکتر باشد")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .matches(englishNameReg, "نام انگلیسی نمیتواند شامل حروف فارسی باشد ");
};

export const generalNameValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ")
      .required(message);
  else
    return yup
      .string()
      .min(3, ". نام باید حداقل سه کاراکتر باشد ")
      .max(255, " . نام ورودی طولانی تر از اندازه استاندارد است ");
};

export const addressValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(10, "آدرس باید حداقل ده کاراکتر باشد")
      .required(message);
  else return yup.string().min(10, "آدرس باید حداقل ده کاراکتر باشد");
};

export const emailValidation = (message?: string) => {
  // proper email validation here
  if (message)
    return yup
      .string()
      .min(10, "آدرس باید حداقل ده کاراکتر باشد")
      .matches(emailReg, "آدرس ایمیل وارد شده درست نیست.")
      .required(message);
  else
    return yup
      .string()
      .min(10, "آدرس باید حداقل ده کاراکتر باشد")
      .matches(emailReg, "آدرس ایمیل وارد شده درست نیست.");
};

export const countryNameValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(4, "نام کشور نمیتواند کوتاه تر از ۴ حرف باشد.")
      .max(255, "نام کشور وارد شده بیش از حد مجاز است ")
      .required(message);
  else return yup.string().min(4, "نام کشور نمیتواند کوتاه تر از ۴ حرف باشد.");
};

export const melliCodeValidation = (message?: string) => {
  //cool melly code validation applies here
  if (message)
    return yup
      .string()
      .length(10)
      .required(message);
  else return yup.string().min(4, countryNameLengthError);
};

export const enumValidation = (en: any, message?: string) => {
  if (message)
    return yup
      .mixed<keyof typeof en>()
      .oneOf(Object.values(en))
      .required(message);
  else return yup.mixed<keyof typeof en>().oneOf(Object.values(en));
};

export const passwordValidation = (message?: string) => {
  //cool melly code validation
  if (message)
    return yup
      .string()
      .min(6, "رمز انتخابی کوتاه تر از حد مجاز است ")
      .max(255, "رمز شما نمیتواند به این بزرگی باشد")
      .required(message);
  else return yup.string().min(6, "رمز انتخابی کوتاه تر از حد مجاز است ");
};

export const mobilePhoneValidation = (message?: string) => {
  if (message)
    return yup
      .string()
      .min(10, " شماره تلفن همراه باید حداقل ده کاراکتر باشد")
      .required(message);
  else
    return yup.string().min(10, " شماره تلفن همراه باید حداقل ده کاراکتر باشد");
};

export const documentValidation = () => {};
