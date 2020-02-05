import * as yup from "yup";
export const orderDateValidation = (message?: string) => {
  // proper email validation here
  if (message)
    return yup
      .date()
      .min(new Date(), "تاریخ وارد شده اشتباه است .")
      .required(message);
  else return yup.date().min(new Date().toLocaleDateString());
};
