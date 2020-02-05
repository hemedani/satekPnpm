import * as yup from "yup";

export const getWareTypeInputValidation = yup.object().shape({
  document: yup.string()
});
