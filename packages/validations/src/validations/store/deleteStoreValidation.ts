import * as yup from "yup";

export const deleteStoreValidation = yup.object().shape({
  id: yup.string().required() //replace with proper regex
});
