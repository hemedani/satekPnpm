import * as yup from "yup";

export const getWareTypesInputValidation = yup.object().shape({
  document: yup.string()
});
