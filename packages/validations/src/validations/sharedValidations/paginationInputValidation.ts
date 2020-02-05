import * as yup from "yup";

export const paginationInputValidation = yup.object().shape({
  page: yup.number().required("شماره صفحه را وارد کنید"),

  take: yup.number().required("تعداد داده های برگشتی را مشخص کنید ")
});
